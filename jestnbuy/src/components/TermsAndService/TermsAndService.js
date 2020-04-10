import React from 'react';

import './TermsAndService.scss';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';

const TermsAndService  =  () => {
    return(
        <div className = 'terms-and-service' >
            <div className = 'header'  >
                <AppHeader/>
            </div>
            <div  className = 'terms-and-service-content' >
                <h3>Terms of Service/Usage</h3>
                <div style = {{ clear  :  'both', height : '10px' }} ></div>
                <div className = "inner-text">
					These Terms and Conditions, as may be amended from time to time, apply to all our services
                    directly or indirectly (through distributors) made available online. By accessing, browsing
                    and using our (mobile) website or any of our applications through whatever platform
                    (hereafter collectively referred to as the "website") and/or by completing a reservation,
                    you acknowledge and agree to have read, understood and agreed to the Terms and Conditions set out
                    below (including the privacy statement).

                    <br></br>These Terms and Conditions are a contract between you and Orion Technologies LLC, a company with it's
                    principle place of business at 347 Fifth Avenue, Suite 1402-369, NY 10016, USA. Orion Technologies LLC
                    operates jetsetbuy.com ("JetSetBuy Site") and all of the products/services provided by the same
                    therein (collectively the "Service"). By using the JetSetBuy Site and any service accessible by
                    JetSetBuy Site, you are agreeing to be bound by the following Terms and Conditions.

                    <br></br><br></br> <strong>Terms and Conditions</strong><br></br>JetSetBuy Site retains all right, title
					and interest in and to the Software. That Software and all parts
					thereof are the subject matter of various proprietary rights,
					including without limitation copyrights, trade secrets, patents and
					other similar intellectual and industrial property rights
					("Proprietary Rights"). This License permits you to use the
					Software on a single personal computer or workstation and to make
					one copy of the Software in machine-readable form for backup
					purposes only. Within any such copy, you must reproduce the
					copyright notices and any other proprietary legends that were on
					the original downloaded copy of the Software. No license, right or
					interest in any trademark, trade name or service mark of
					JetSetBuy Site or any third party is granted under this
					License. You acknowledge that neither this License, nor your
					subsequent registration of the Software (should you choose to
					register the Software, and thereby enable additional use or
					functionality) in no way shall be construed to provide an express
					or implied license to use, modify or improve any of the content of
					the Software, including without limitation, or any works,
					inventions, discoveries, technology or other items which are the
					subject matter of JetSetBuy Site's Proprietary Rights or
					otherwise to use or exploit the Software or the Proprietary Rights
					in any matter not expressly permitted herein. <br></br><br></br><strong>1.
						Restrictions</strong><br></br> You may not attempt to create or derive any of
					the source code or other technology or data within the Software by
					disassembly, reverse engineering or any other method, or otherwise
					reduce the Software to a human-perceivable form. You may not modify
					or translate any part of the Software. You may not use, disclose,
					distribute, make or have made any copies of the Software, in whole
					or in part, nor rent, lease or lend the Software without the prior
					written authorization of JetSetBuy Site, provided, however,
					that you may maintain a backup copy of the Software during the term
					of this License. You agree to provide notice to JetSetBuy
					Software immediately after learning of or having reason to suspect
					a breach of any of the provisions set forth in this License.<br></br><br></br>

					<strong>2. Termination</strong><br></br> This License is effective
					until terminated. You may terminate this License at any time by
					destroying the Software, and all copies thereof. This License will
					terminate immediately without notice from JetSetBuy Site if
					you fail to comply with any provision of this License. Upon
					termination, you must destroy the Software and all copies thereof.<br></br><br></br>

					<strong>3. Disclaimer of Warranty</strong><br></br> Regardless of
					whether you later choose to register your copy of the software, the
					software and related documentation are provided "as is," without
					warranty of any kind, and JetSetBuy site expressly disclaims
					all warranties, express or implied, including, but not limited to,
					the implied warranties of design, merchantability, fitness for a
					particular purpose, or non-infringement, any warranties arising
					from a course of dealing, usage, or trade practice, or any
					warranties of non-infringement of any third party's patent(s),
					trade secret(s), copyright(s) or other intellectual property
					rights. JetSetBuy site does not warrant that the functions
					contained in the software will meet your requirements, or that the
					operation of the software will be uninterrupted or error-free, or
					that defects in the software will be corrected.<br></br> Furthermore,
					JetSetBuy Site does not warrant or make any representations
					regarding the use or the results of the use of the software or
					related documentation in terms of their correctness, accuracy,
					reliability, or otherwise. No oral or written information or advice
					given by JetSetBuy Site or JetSetBuy Site's
					authorized representative shall create any warranty or in any way
					increase the scope of this warranty. Should the Software prove
					defective, you (and not JetSetBuy Site or JetSetBuy
					Software's authorized representative) assume the entire cost of all
					necessary servicing, repair or correction. Some states do not allow
					exclusion of implied warranties, so the above exclusion may not
					apply to you. This warranty gives you specific legal rights, and
					you may also have other rights which vary from state to state.<br></br><br></br>

					<strong>4. Limitation of Liability</strong><br></br> Under no
					circumstances, including negligence, shall JetSetBuy Site be
					liable for any lost revenue or profits or any incidental, indirect,
					special, or consequential damages that result from the use or
					inability to use the software or related documentation, even if
					JetSetBuy Site or JetSetBuy Site's authorized
					representative has been advised of the possibility of such damages.
					some states do not allow the limitation or exclusion of liability
					for incidental or consequential damages so the above limitation or
					exclusion may not apply to you. in no event shall jetsetbuy
					software's total liability to you for all damages, losses, and
					causes of action, whether in contract, tort (including negligence)
					or otherwise, exceed the amount paid by you for the software.<br></br><br></br>

					<strong>5. Controlling Law</strong><br></br> This License shall be
					governed by and construed in accordance with the substantive laws
					of the State of Massachusetts, notwithstanding the conflicts of law
					provisions of that state or any other jurisdiction. All disputes
					arising out of this license shall be subject to the exclusive
					jurisdiction of federal and state courts located in Wyoming,
					USA.<br></br> <br></br><strong>6. Complete Agreement</strong><br></br>
					This License constitutes the entire agreement between the parties
					with respect to the use of the Software and supersedes all prior or
					contemporaneous understandings or agreements, written or oral,
					regarding such subject matter.
				</div>
                    <div className = 'clear' ></div>
                    <div>For any queries please write to support@jetsetbuy.com</div>
            </div>
            <div className = 'PageFooter' >
                <AppFooter/>
            </div>
        </div>
    )
}

export default TermsAndService;