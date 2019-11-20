import datetime
import pymysql
import logging
import smtplib
import sys

from pymongo import MongoClient
from user_agents import parse

from pymysql.err import MySQLError,Error



class UaUpdater():
  """
  This class is for user agents update in the
  MYSQL database , contains following methods

  preprocessor checks() ---> checks whether the ua_crawler is running or not if running pass to next method
  fetch_latest_ua_mongo() ---> fetching latest user agents from the mongo db and store it in the form of dictionary
  open_prod_db_conn()  ---> open the connection with mysql
  fetch_ua_from_prod_db() ---> it fetch user agents from production database in the mysql
  update_ua_to_dict() ---> taking both the dictionary mongodb_ua_dict and proddb_ua_dict , it fetch the latest user agents
  update_ua_to_prod_db ---> it updates the user agents in the mysql database 
  close_prod_db_conn() ---> it close the connection 
  """

  def __init__(self):
    self.prod_db_conn = None
    self.prod_db_cursor = None
    self.row_count = None
    self.worker()


  def worker(self):
    try:
        mongodb_client_conn = MongoClient('localhost',27017)
        mongodb_db = mongodb_client_conn['useragent']
        mongodb_coll = mongodb_db['ua_usage']
        
        
        pre_process_result = pre_processor_check(mongodb_client_conn,mongodb_db,mongodb_coll)
        pre_process_result = True   # for testing only the pre_process result is true
        if pre_process_result:
            
            mongoDb_ua_dict=fetch_latest_ua_mongo(mongodb_coll)
            
       
    except ConnectionError as e:
        print("error while opening db connections",e)
    finally:
        mongodb_client_conn.close()
        print('MongoDB client connection closed successfully')

    
    self.open_prod_db_conn()
    
    start =0
    
    while True:
      if start >= self.row_count:
        
        break
      print(start)
      
      prod_db_cursor = self.prod_db_cursor
      prodDb_ua_dict = fetch_ua_from_prod_db(prod_db_cursor,start)
      print('no of rows read ',len(prodDb_ua_dict))
      
      
      final_ua_dict = update_ua_to_dict(mongoDb_ua_dict,prodDb_ua_dict)
      
      update_ua_to_prod_db(final_ua_dict)
      
      start +=5
      
    
    
    close_prod_db_conn(self.prod_db_conn)
      
        
    
  def open_prod_db_conn(self):
      """
      This method open the connection with
      MySQL

     """
      
      try:
          prod_db_conn = pymysql.connect(host="localhost", user="root", passwd="intelliapt560071", database="ua_prod_db")
          prod_db_cursor = prod_db_conn.cursor()
          row_count = prod_db_cursor.execute('select * from ua_ip_chrome_mapping;')
      except Error as err:
          print("Error while connecting to MySQL", err)
      except MySQLError as err:
          print("MySQLError occured :", err)
      except Exception as err:
          print('Base exceptions ocurred:',err)
      except:
          print("Some unknown exception ocurred")

          sys.exit()

      self.prod_db_conn = prod_db_conn
      self.prod_db_cursor = prod_db_cursor
      self.row_count = row_count   
      

    
def pre_processor_check(mongodb_client_conn,mongodb_db,mongodb_coll):
    """
    This connect with the MongoDb and reads the timestamp from the MongoDb by the findById method that
    when did the database was updated last by UserAgent crawler , also reads the current 
    timestamp and checks the difference from current timestamp to mongodb timestamp 
    whether it is less than 1 day or more than 1 day.
    And if the document is not available in the database it will go out of the loop
    and execute the else block 
        While opening the connection it can raise exception 

    Arguments
    .........
        mongodb_client_conn
        mongodb_db
        mongodb_coll

    Returns
    .......
    On the basis of difference in timestamp it returns True or False
    
    *if the condition is true it will execute the fetch_latest_ua_mongo() method

    *if the condition is false it will log that exception in ua_crawler.log file 
    and soffset mail.

    """
    
    
    print('pre processor running')
    document_time = mongodb_coll.find()[0]['updated_on']
    if document_time:
        #datetimeFormat = '%Y-%m-%d %H:%M:%S.%f'
        document_time = datetime.datetime.strptime(document_time, '%Y-%m-%d %H:%M:%S.%f')
        current_time = datetime.datetime.now()
        diff = current_time - document_time
        print(diff)
        
        if str(diff) < '2 days, 0:0:0.0':
            return True
        else:
            logging.basicConfig(filename='ua_crawler.log',format ='%(asctime)s %(message)s',filemode ='w')
            logger = logging.getLogger()
            logger.setLevel(logging.DEBUG)
            logger.debug("crawler not running")
            #server = smtplib.SMTP('smtp.gmail.com',587)
            #server.strttls()
            #server.login("soffseter username","password")
            #server.soffsetmail("soffseter username","receiver username","message")

    else:
        print('document not found!')
 

def fetch_latest_ua_mongo(mongodb_coll):
    """
    This method fetch the collection from the MongoDb 
    having key 'user_agents' and after that it parse the key 'ua'

    Arguments
    ..........
    mongodb_coll

    Returns
    .......
    dict{mongoDb_ua_dict}

    """
    

    mongoDb_ua_dict ={}
    Win_os_ver =set()
    Mac_os_ver =set()
    Linux_os_ver =set()
    chrome_ver = set()
    os = {'Windows','Mac OS X','Linux'}

    for ua in mongodb_coll.find()[0]['user_agents'].keys():
        parse_ua = parse(ua)
        mongoDb_ua_dict.update({ ua : { 'osFamily': parse_ua.os.family , 'osVerString': parse_ua.os.version_string , 'browserFamily': parse_ua.browser.family , 'browserVerString': parse_ua.browser.version_string} })
        chrome_ver.add(parse_ua.browser.version_string)
        if parse_ua.os.family =='Windows':
            Win_os_ver.add(float(parse_ua.os.version_string))
        elif parse_ua.os.family =='Mac OS X':
            
            Mac_os_ver.add(parse_ua.os.version_string)
        elif parse_ua.os.family =='Linux':
            Linux_os_ver.add(parse_ua.os.version_string)
    
    
    
    
    mongoDb_ua_dict.update({'os': os,'Win_os_ver':Win_os_ver,'Mac_os_ver':Mac_os_ver,'Linux_os_ver':Linux_os_ver,'chrome_ver':chrome_ver})
    
    
    
    
    
    print("connection closed with MongoDb")
    return mongoDb_ua_dict



def fetch_ua_from_prod_db(prod_db_cursor, start):  
    """
    This method retrive the user agent string
    from ua_prod_db with ip in the form of dictionary 
    where it have condition like last_ua_update 
    is NULL AND last_used is NOT NULL ORDER BY is last_used 
    and LIMIT ia 100

    Arguments
    ........
    prod_db_conn
    start

    Returns
    .......
    dict{prodDb_ua_dict}
    """
    
    
    offset=5
    prod_db_cursor.execute("SELECT ip,ua FROM ua_prod_db.ua_ip_chrome_mapping WHERE last_ua_update is NULL ORDER BY last_used DESC LIMIT %d,%d;"%(start,offset))
    rows = prod_db_cursor.fetchall()  
    prodDb_ua_dict = {}   
    for row in rows:
        ua_string = row[1]
        parse_ua = parse(ua_string)
        prodDb_ua_dict.update({ row[0] : { "ua": row[1] , "browserFamily" : parse_ua.browser.family , "browserVersion" : parse_ua.browser.version , "browserVersionString" : parse_ua.browser.version_string, "osFamily" : parse_ua.os.family,"osVersion":parse_ua.os.version, "osVersionString": parse_ua.os.version_string } })
    print(len(prodDb_ua_dict))
    print(start)
    print("rows read in this loop set from prod db:")
    
    del prod_db_cursor
    #prod_db_cursor.close()
    return prodDb_ua_dict


def update_ua_to_dict(mongoDb_ua_dict,prodDb_ua_dict):
  """
  This method import the dictonary from the ua_prod_db and ua_mongo_db
  and compare it with different logics to find out the updated dictionary

  Arguments
  ..........
  dict{mongoDb_ua_dict}
  dict{prodDb_ua_dict}

  Returns
  ........

  dict{final_ua_dict}
  """
    
  osn_count=0

  win_osy_osvy_bfy_bvy_count = 0 
  win_osy_osvy_bfy_bvn_count = 0
  win_osy_osvy_bfn_count = 0
  win_osy_osvn_bfy_bvy =  0
  win_osy_osvn_bfy_bvn_count =  0
  win_osy_osvn_bfn_count =  0

  mac_osy_osvy_bfy_bvy_count = 0 
  mac_osy_osvy_bfy_bvn_count = 0
  mac_osy_osvy_bfn_count = 0
  mac_osy_osvn_bfy_bvy =  0
  mac_osy_osvn_bfy_bvn_count =  0
  mac_osy_osvn_bfn_count =  0

  lin_osy_osvy_bfy_bvy_count = 0 
  lin_osy_osvy_bfy_bvn_count = 0
  lin_osy_osvy_bfn_count = 0
  lin_osy_osvn_bfy_bvy =  0
  lin_osy_osvn_bfy_bvn_count =  0
  lin_osy_osvn_bfn_count =  0

  final_ua_dict = {"ip":[]}

  



  
  def update_browser_version(ip,os, os_ver,mongoDb_ua_dict):
    for ua in mongoDb_ua_dict.keys():
      if parse(ua).os.family == os and  parse(ua).os.version_string== os_ver and parse(ua).browser.version_string == max(mongoDb_ua_dict.get('chrome_ver',None)):
        final_ua_dict.update({ip:ua})
       
        break
  
  def update_os_version(ip,os, os_ver,mongoDb_ua_dict):
    temp_dict={}
    if os == 'Windows':
      print(os,'------',ip,'----------',os_ver)

      for ua in mongoDb_ua_dict.keys():
        if parse(ua).os.family == os and parse(ua).os.version[0] == max(mongoDb_ua_dict.get('Win_os_ver',None)):
          temp_dict.update({ua:parse(ua).browser.version_string})
          
      for ua, browser_version in temp_dict.items(): 
              if browser_version == max(temp_dict.values()):
                  final_ua_dict.update({ip:ua})
                  break
    elif os == 'Mac OS X':
      for ua in mongoDb_ua_dict.keys():
        if parse(ua).os.family == os and parse(ua).browser.version_string == browser_ver and  parse(ua).os.version[0] == max(mongoDb_ua_dict.get('Mac_os_ver',None)):
          final_ua_dict.update({ip:ua})
          break
        continue
    elif os == 'Linux':
      for ua in mongoDb_ua_dict.keys():
        if parse(ua).os.family == os and parse(ua).browser.version_string == browser_ver and  parse(ua).os.version[0] == max(mongoDb_ua_dict.get('Linux_os_ver',None)):
          final_ua_dict.update({ip:ua})
          break
        continue
    
      
      
  def update_os_bv_version(ip,os, os_ver,mongoDb_ua_dict):
    if os == 'Mac OS X':
      print(os)
      for ua in mongoDb_ua_dict.keys():
        if parse(ua).os.family =='Mac OS X' and parse(ua).os.version_string == max(mongoDb_ua_dict.get('Mac_os_ver',None)) and parse(ua).browser.version_string == max(mongoDb_ua_dict.get('chrome_ver',None)):
          final_ua_dict.update({ip:ua})
          break
        continue
    elif os == 'Windows':
      for ua in mongoDb_ua_dict.keys():
        if parse(ua).os.family =='Windows' and parse(ua).os.version[0] == max(mongoDb_ua_dict.get('Win_os_ver',None)) and parse(ua).browser.version_string == max(mongoDb_ua_dict.get('chrome_ver',None)):
          final_ua_dict.update({ip:ua})
          break
        continue
    elif os == 'Linux':
      for ua in mongoDb_ua_dict.keys():
        if parse(ua).os.family =='Linux' and parse(ua).os.version_string == max(mongoDb_ua_dict.get('Linux_os_ver',None)) and parse(ua).browser.version_string == max(mongoDb_ua_dict.get('chrome_ver',None)):
          final_ua_dict.update({ip:ua})
          break
        continue
    
   

  print('entering for loop to update final_ua_dic and items in prodDb_ua_dic is:',len(prodDb_ua_dict))
  for sqldb_dic_key, sqldb_dic_val in prodDb_ua_dict.items():
    
    ip= sqldb_dic_key
    ua= sqldb_dic_val.get('ua',None)
    os = sqldb_dic_val.get('osFamily',None)
    os_ver = sqldb_dic_val.get('osVersionString',None)
    browser_family = sqldb_dic_val.get('browserFamily',None)
    browser_ver = sqldb_dic_val.get('browserVersionString',None)
    print(ip)
    print(ua)
    print(os)
    print(os_ver)
    
    if os in mongoDb_ua_dict.get('os',None):
      if os == 'Windows':
        if float(os_ver) in mongoDb_ua_dict.get('Win_os_ver',None):
          if browser_family =='Chrome':
            if browser_ver in mongoDb_ua_dict.get('chrome_ver',None):
              
              #all req are meeting just pass
              final_ua_dict.get('ip',None).append(ip)
              win_osy_osvy_bfy_bvy_count +=1
              continue
            else:
              
              final_ua_dict.get('ip',None).append(ip)
              update_browser_version(ip,os,os_ver,mongoDb_ua_dict)
              win_osy_osvy_bfy_bvn_count +=1
              #update browser version with latest
          else:
            #browser family is not chrome just pass
            final_ua_dict.get('ip',None).append(ip)
            win_osy_osvy_bfn_count +=1
            continue
        else:
          if browser_family =='Chrome':
            if browser_ver in mongoDb_ua_dict.get('chrome_ver',None):
              
              
              print(ua)
              
              final_ua_dict.get('ip',None).append(ip)
              update_os_version(ip,os, os_ver,mongoDb_ua_dict)
              win_osy_osvn_bfy_bvy +=1
            else:
             
              #update osv and browser version [os old bv is also old]
              final_ua_dict.get('ip',None).append(ip)
              update_os_bv_version(ip,os, os_ver,mongoDb_ua_dict)
              win_osy_osvn_bfy_bvn_count +=1
          else:
            final_ua_dict.get('ip',None).append(ip)
            win_osy_osvn_bfn_count +=1
            #os version not in our MongoDb and Browser Family not Chrome so just pass
            continue
      
      
      elif os == 'Mac OS X':
        if os_ver in mongoDb_ua_dict.get('Mac_os_ver',None):
          if browser_family =='Chrome':
            if browser_ver in mongoDb_ua_dict.get('chrome_ver',None):
              
              #all req are meeting just pass
              final_ua_dict.get('ip',None).append(ip)
              mac_osy_osvy_bfy_bvy_count +=1
              continue
            else:
              final_ua_dict.get('ip',None).append(ip)
              update_browser_version(ip,os,os_ver,mongoDb_ua_dict)
              mac_osy_osvy_bfy_bvn_count +=1
              #update browser version with latest
          else:
            #browser family is not chrome just pass
            final_ua_dict.get('ip',None).append(ip)
            mac_osy_osvy_bfn_count +=1
            continue
        else:
          if browser_family =='Chrome':
            if browser_ver in mongoDb_ua_dict.get('chrome_ver',None):
              
              update_os_version(ip,os, os_ver,mongoDb_ua_dict)
             
              #update os version with latest [browser is updated, os version is old]
              final_ua_dict.get('ip',None).append(ip)
              mac_osy_osvn_bfy_bvy +=1
            else:
              
              #update osv and browser version [os old bv is also old]
              final_ua_dict.get('ip',None).append(ip)
              update_os_bv_version(ip,os, os_ver,mongoDb_ua_dict)
              mac_osy_osvn_bfy_bvn_count +=1
          else:
            final_ua_dict.get('ip',None).append(ip)
            mac_osy_osvn_bfn_count +=1
            #os version not in our MongoDb and Browser Family not Chrome so just pass
            continue
      
      elif os == 'Linux':
        if os_ver in mongoDb_ua_dict.get('Linux_os_ver',None):
          if browser_family =='Chrome':
            if browser_ver in mongoDb_ua_dict.get('chrome_ver',None):
              
              #all req are meeting just pass
              final_ua_dict.get('ip',None).append(ip)
              lin_osy_osvy_bfy_bvy_count +=1
              continue
            else:
              #update browser version with latest   
              final_ua_dict.get('ip',None).append(ip)   
              update_browser_version(ip,os,os_ver,mongoDb_ua_dict)
              lin_osy_osvy_bfy_bvn_count +=1
          else:
            #browser family is not chrome just pass
            final_ua_dict.get('ip',None).append(ip)
            lin_osy_osvy_bfn_count +=1
            continue
        else:
          if browser_family =='Chrome':
            if browser_ver in mongoDb_ua_dict.get('chrome_ver',None):
              update_os_version(ip,os, os_ver,mongoDb_ua_dict)
              
              #update os version with latest [browser is updated, os version is old]
              final_ua_dict.get('ip',None).append(ip)
              lin_osy_osvn_bfy_bvy +=1
            else:
              
              #update osv and browser version [os old bv is also old]
              final_ua_dict.get('ip',None).append(ip)
              update_os_bv_version(ip,os, os_ver,mongoDb_ua_dict)
              lin_osy_osvn_bfy_bvn_count +=1
          else:
            #os version not in our MongoDb and Browser Family not Chrome so just pass
            final_ua_dict.get('ip',None).append(ip)
            lin_osy_osvn_bfn_count +=1
            continue
      

    else:
      final_ua_dict.get('ip',None).append(ip)
      osn_count +=1
      print(ua)
      continue



  
  


  print('no os match count : ', osn_count)

  print('==========================================Windows os stats:==========================================')
  print('same ua count:',win_osy_osvy_bfy_bvy_count)
  print('old browser version count:',win_osy_osvy_bfy_bvn_count)
  print('ua with no browser family Chrome count:',win_osy_osvy_bfn_count)
  print('os old, bv in our mongodb:',win_osy_osvn_bfy_bvy)
  print('os version old and browser version old count:',win_osy_osvn_bfy_bvn_count)
  print('os version is old and browser family is not chrome count:',win_osy_osvn_bfn_count)


  print('==========================================Mac os stats:==========================================')
  print('same ua count:',mac_osy_osvy_bfy_bvy_count)
  print('old browser version count:',mac_osy_osvy_bfy_bvn_count)
  print('ua with no browser family Chrome count:',mac_osy_osvy_bfn_count)
  print('os old, bv in our mongodb:',mac_osy_osvn_bfy_bvy)
  print('os version old and browser version old count:',mac_osy_osvn_bfy_bvn_count)
  print('os version is old and browser family is not chrome count:',mac_osy_osvn_bfn_count)


  print('==========================================Linux os stats:==========================================')
  print('same ua count:',lin_osy_osvy_bfy_bvy_count)
  print('old browser version count:',lin_osy_osvy_bfy_bvn_count)
  print('ua with no browser family Chrome count:',lin_osy_osvy_bfn_count)
  print('os old, bv in our mongodb:',lin_osy_osvn_bfy_bvy)
  print('os version old and browser version old count:',lin_osy_osvn_bfy_bvn_count)
  print('os version is old and browser family is not chrome count:',lin_osy_osvn_bfn_count)

       
      

  
  print('Updation status:========================================================')
  print("list of ips added to update last_ua_update,",len(final_ua_dict.get('ip',None)))
  print('No of useragents that found to be updated',(len(final_ua_dict)-1) )
  #print(len(final_ua_dict))
  print('list of ips added for mandatory last_ua_update')
  print(final_ua_dict.get('ip',None))
  print('final dictionary with ip whose ua have to be updated')
  print(final_ua_dict)
  return final_ua_dict


def update_ua_to_prod_db(final_ua_dict):
  """
  This method update the MySQL database with the potential
  UserAgents and also update the last_ua_update 

  Arguments
  ..........
  prod_db_conn
  dict{prodDb_ua_dict}
  dict{final_ua_dict}

  
  """
  
  prod_db_conn = pymysql.connect(host="localhost", user="root", passwd="intelliapt560071", database="ua_prod_db")
  prod_db_cursor = prod_db_conn.cursor()
  mandatory_ip_update_count =0
  for key, val in final_ua_dict.items():
    prod_db_cursor.execute('update ua_ip_chrome_mapping set ua="%s" where ip="%s";'%(val,key))
    prod_db_cursor.fetchall()
  
  for passed_ip in final_ua_dict.get('ip',None):
    mandatory_ip_update_count +=1
    prod_db_cursor.execute('update ua_ip_chrome_mapping set last_ua_update = current_timestamp() where ip = "%s";'%passed_ip)
  
  prod_db_conn.commit()
  
  

def close_prod_db_conn(prod_db_conn):
  """
  This method close the connection 
  of the database 

  Arguments
  ..........
  prod_db_conn
  prod_db_cursor

  
  """
  prod_db_conn.commit()
  prod_db_conn.close()
  print("MySQL connection is closed")

ua_updater_obj=UaUpdater()
