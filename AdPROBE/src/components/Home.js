import React, {Component} from 'react';
import '../scss/content.scss';
import {Dialog} from '@material-ui/core';
import ScheduleDemo from './ScheduleDemo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Box from './common/box';
import LazyProgressiveLoad from '../ExtraComponents/Lazy-Progressive-Image-Loading/src/LazyProgressiveImageLoading/LazyProgressiveImageLoading';
import Group6097 from "../Assets/Group6097.svg";
class Home extends Component {
	constructor(props) {
        super(props);
		this.state = {
			testimonial: [
				{id: 0, animation: '0s', name: 'Siddhant', image: '/media/sid.jpg', text: 'Usce finibus felis tellus, vitae laoreet turpis sollicitudin quis. Sed tempus magna libero, non pellentesque dui vehicula sit amet. Praesent mollis elit odio.'},
				{id: 1, animation: '.2s', name: 'Nikita', image: '/media/sid.jpg', text: 'Usce finibus felis tellus, vitae laoreet turpis sollicitudin quis. Sed tempus magna libero, non pellentesque dui vehicula sit amet. Praesent mollis elit odio.'},
				{id: 2, animation: '.4s', name: 'Shakeer', image: '/media/sid.jpg', text: 'Usce finibus felis tellus, vitae laoreet turpis sollicitudin quis. Sed tempus magna libero, non pellentesque dui vehicula sit amet. Praesent mollis elit odio.'},
			],
			box: [
				{ imageSrc: '/media/video-conference.svg', heading: '80M+', boxContent: 'Request Servered', animationName: 'slideInDown'},
				{ imageSrc: '/media/Page-1.svg', heading: '16M+', boxContent: 'Unique IPs', animationName: 'slideInUp'},
				{ imageSrc: '/media/multi-devices.svg', heading: '8M+', boxContent: 'Unique Devices', animationName: 'slideInDown'},
				{ imageSrc: '/media/world.svg', heading: '150+', boxContent: 'Countries', animationName: 'slideInUp'}
			],
			infoDialog: false
		}
		
	}

	showDemoSlider = () => {
       this.setState({
		   infoDialog: !this.state.infoDialog
	   })
	}
	toggleMsg = () => {
		this.setState({
			msgOpen: !this.state.msgOpen
		})

	}

	handleSubmit = () => {
		this.showDemoSlider();
		this.toggleMsg();
	}

  render() {
  	this.box = this.state.box.map((item, key) => <Box key={this.state.box.indexOf(item)} box={item} />);

  	// testimonial code hidden

	// this.items = this.state.testimonial.map((item, key) =>
	// 		<li key={ this.state.testimonial.indexOf(item) } className="testmonial-content wow slideInRight" data-wow-delay={item.animation}>
	// 			<div className="testimonial">
	// 				<p>{item.text}</p>
	// 				<h3 key={item.id}>{item.name}</h3>
	// 			</div>
	// 			<img src={item.image} alt={item.name} />
	// 		</li>
	// 	);
    return (
      <div>
		<div className="sec-1-cover">
			<div className="sec-1">
				<div className="sec-1-content">

					<div>
						<h1 className="wow fadeIn" data-wow-delay="0.2s">One-stop <br />Ad Verification <br />Solution</h1>
						<p className="wow fadeIn" data-wow-delay="0.4s">Increasingly, Bots Are Dominating Digital Advertising Channels, Driving Up Costs And Creating A Low-Trust Environment For Publishers. AdProbe Combines Tech, Protection & Convenience.</p>
						<Link className="wow fadeIn" data-wow-delay="0.6s" to='/' onClick={() => this.showDemoSlider()}>schedule a demo</Link>
						{/* <p>{process.env.REACT_APP_API_ENDPOINT}</p> */}
					</div>
					
					
				</div>
				<div className="background-img wow fadeInRight">
						{/* <img src="/media/sec-1.svg" alt="adprobe work style"/> */}
						<LazyProgressiveLoad 
							srcImage = {"/media/sec-1.svg"}
							placeHolderImage = { { url: Group6097} }
							alt={"adprobe work style"}
							style={{width: '90%'}}
						/>
					</div>
			</div>
		</div>



		      <section>
					<div className="sec-2-cover">
						<div className="sec-2">
							<h2>How We Help Your Business</h2>
							<div className="row">
								<div className="col-md-4">
									<div className="box wow fadeInLeft" data-wow-delay="0s">
										<div className="box-icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="74.422" height="73.384" viewBox="0 0 74.422 73.384">
												<defs>
													<style>
														{/* .cls-1{fill: #00bce3} */}
													</style>
												</defs>
												<g id="authentication">
													<g id="Group_2399" data-name="Group 2399">
														<path  fill="00bce3" id="Path_2071" d="M58.135 34.186l.007-19.652L29.071 0 0 14.535V33.79a36 36 0 0 0 16.053 30l13.018 8.675L39.1 65.786a19.752 19.752 0 1 0 19.036-31.6zM29.071 69.675l-11.727-7.817A33.672 33.672 0 0 1 2.326 33.79V15.972L29.071 2.6l26.745 13.372v17.947c-.386-.023-.769-.059-1.163-.059s-.778.036-1.163.059V17.407L29.071 5.2 4.651 17.408V33.79a31.36 31.36 0 0 0 13.983 26.131l10.437 6.954 7.607-5.069a19.7 19.7 0 0 0 1.1 2.066zm6.737-10.083l-6.737 4.488-9.145-6.094c-.451-.3-.889-.618-1.32-.942V46.651H16.28v8.442a29.049 29.049 0 0 1-3.489-3.872v-6.758a3.489 3.489 0 0 1 2.639-3.382l7.886-1.981a5.808 5.808 0 0 0 4.592 5.105v4.768h2.326v-4.764a5.805 5.805 0 0 0 4.591-5.109L40 40.4a19.668 19.668 0 0 0-4.193 19.187zM23.257 24.557h3.214a12.249 12.249 0 0 0 5.192-1.163h.315l2.907 3.876v4.846l-3.876 2.907h-3.877l-3.876-2.907zm-2.229-2.326a4.549 4.549 0 0 1 2.491-3.361 11.743 11.743 0 0 1 8.165-.514l.267.386h1.771a1.163 1.163 0 0 1 1.163 1.163v3.489l-1.744-2.326h-2.019l-.245.122a9.916 9.916 0 0 1-4.406 1.041zm11.531 14.536v1.744a3.489 3.489 0 1 1-6.977 0v-1.744l.776.581h5.426zm2.326-.045v-1.7l2.326-1.744V19.906a3.488 3.488 0 0 0-3.489-3.489h-.773c-1.682-1.023-5.871-1.229-8.838-.3a7.236 7.236 0 0 0-5.506 7.279v1.163h2.326v8.721l2.326 1.744v1.693l-8.393 2.11a5.8 5.8 0 0 0-4.4 5.637V47.6a29.04 29.04 0 0 1-3.487-13.81V18.845L29.071 7.8l22.094 11.045V33.79c0 .133-.008.266-.009.4a19.676 19.676 0 0 0-9.2 4.31zm19.769 34.349A17.443 17.443 0 1 1 72.1 53.628a17.443 17.443 0 0 1-17.446 17.443zm0 0" className="cls-1" data-name="Path 2071"/>
													</g>
													<path fill="#00bce3" id="Path_2072" d="M416 136.945h13.954v2.326H416zm0 0" className="cls-1" data-name="Path 2072" transform="translate(-355.532 -117.039)"/>
													<path fill="#00bce3" id="Path_2073" d="M416 168.945h9.3v2.326H416zm0 0" className="cls-1" data-name="Path 2073" transform="translate(-355.532 -144.388)"/>
													<path fill="#00bce3" id="Path_2074" d="M416 200.945h4.651v2.326H416zm0 0" className="cls-1" data-name="Path 2074" transform="translate(-355.532 -171.737)"/>
													<path fill="#00bce3" id="Path_2075" d="M283.7 295.609l-4.11-4.111-6.578 6.577 10.688 10.689 18.089-18.089-6.579-6.577zm0 9.867l-7.4-7.4 3.29-3.289 4.11 4.11 11.512-11.512 3.29 3.289zm0 0" className="cls-1" data-name="Path 2075" transform="translate(-233.325 -242.803)"/>
												</g>
											</svg>

											{/* <img src="/media/authentication.svg" alt="" /> */}
										</div>
										<div className="dummy-box-height"></div>
										<h3>Contextual Brand Safety</h3>
										<p>Protect your brand and help build trust with consumers by deploying our technology to safeguard against any reputational damage.</p>
										{/* <a href="#"><i className="fa fa-arrow-right" aria-hidden="true"></i></a> */}
									</div>
								</div>

								<div className="col-md-4">
									<div className="box wow fadeInDown" data-wow-delay=".2s">
										<div className="box-icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="80.198" height="85.653" viewBox="0 0 80.198 85.653">
												<defs>
													<style>
														{/* .cls-1{fill:#00bce3} */}
													</style>
												</defs>
												<g id="visibility" transform="translate(-16.303)">
													<g id="Group_74" data-name="Group 74" transform="translate(16.303 19.907)">
														<g id="Group_73" data-name="Group 73">
															<path fill="#00bce3" id="Path_2076" d="M95.123 137.918a2.044 2.044 0 1 0-3.223 2.514 2.413 2.413 0 0 1 0 2.972 44.889 44.889 0 0 1-18.75 14.138 22.869 22.869 0 0 0 .052-31.2 44.85 44.85 0 0 1 11.7 6.921c.439.36.878.734 1.3 1.11a2.044 2.044 0 1 0 2.71-3.06 49.597 49.597 0 0 0-1.421-1.211 49.085 49.085 0 0 0-69.818 7.812 6.5 6.5 0 0 0 0 8 49.084 49.084 0 0 0 77.443 0 6.5 6.5 0 0 0 .007-7.996zM20.9 143.4a2.413 2.413 0 0 1 0-2.972A44.887 44.887 0 0 1 39.649 126.3a22.871 22.871 0 0 0 0 31.245A44.887 44.887 0 0 1 20.9 143.4zm35.523 17.345h-.05a18.831 18.831 0 0 1 0-37.663h.044a18.831 18.831 0 0 1 .006 37.663z" className="cls-1" data-name="Path 2076" transform="translate(-16.303 -118.999)"/>
														</g>
													</g>
													<g id="Group_76" data-name="Group 76" transform="translate(47.73 34.154)">
														<g id="Group_75" data-name="Group 75">
															<path fill="#00bce3" id="Path_2077" d="M212.833 204.16a8.672 8.672 0 1 0 8.672 8.672 8.682 8.682 0 0 0-8.672-8.672zm0 13.257a4.585 4.585 0 1 1 4.585-4.585 4.591 4.591 0 0 1-4.585 4.585z" className="cls-1" data-name="Path 2077" transform="translate(-204.161 -204.16)"/>
														</g>
													</g>
													<g id="Group_78" data-name="Group 78" transform="translate(54.358)">
														<g id="Group_77" data-name="Group 77">
															<path fill="#00bce3" id="Path_2078" d="M245.828 0a2.044 2.044 0 0 0-2.044 2.044v7.664a2.044 2.044 0 0 0 4.088 0V2.044A2.044 2.044 0 0 0 245.828 0z" className="cls-1" data-name="Path 2078" transform="translate(-243.784)"/>
														</g>
													</g>
													<g id="Group_80" data-name="Group 80" transform="translate(54.358 73.901)">
														<g id="Group_79" data-name="Group 79">
															<path fill="#00bce3" id="Path_2079" d="M245.828 441.753a2.044 2.044 0 0 0-2.044 2.044v7.664a2.044 2.044 0 1 0 4.088 0V443.8a2.044 2.044 0 0 0-2.044-2.047z" className="cls-1" data-name="Path 2079" transform="translate(-243.784 -441.753)"/>
														</g>
													</g>
													<g id="Group_82" data-name="Group 82" transform="translate(79.382 11.945)">
														<g id="Group_81" data-name="Group 81">
															<path  fill="#00bce3" id="Path_2080" d="M400.671 72a2.044 2.044 0 0 0-2.891 0l-3.813 3.813a2.044 2.044 0 0 0 2.89 2.891l3.814-3.813a2.044 2.044 0 0 0 0-2.891z" className="cls-1" data-name="Path 2080" transform="translate(-393.369 -71.403)"/>
														</g>
													</g>
													<g id="Group_84" data-name="Group 84" transform="translate(25.52 65.807)">
														<g id="Group_83" data-name="Group 83">
															<path fill="#00bce3" id="Path_2081" d="M78.705 393.967a2.044 2.044 0 0 0-2.89 0L72 397.781a2.044 2.044 0 0 0 2.89 2.891l3.814-3.813a2.044 2.044 0 0 0 .001-2.892z" className="cls-1" data-name="Path 2081" transform="translate(-71.403 -393.369)"/>
														</g>
													</g>
													<g id="Group_86" data-name="Group 86" transform="translate(25.52 11.945)">
														<g id="Group_85" data-name="Group 85">
															<path fill="#00bce3" id="Path_2082" d="M78.706 75.815L74.892 72A2.044 2.044 0 0 0 72 74.892l3.815 3.808a2.044 2.044 0 1 0 2.89-2.89z" className="cls-1" data-name="Path 2082" transform="translate(-71.403 -71.403)"/>
														</g>
													</g>
													<g id="Group_88" data-name="Group 88" transform="translate(79.382 65.807)">
														<g id="Group_87" data-name="Group 87">
															<path fill="#00bce3" id="Path_2083" d="M400.669 397.78l-3.813-3.813a2.044 2.044 0 1 0-2.891 2.891l3.814 3.813a2.044 2.044 0 1 0 2.89-2.891z" className="cls-1" data-name="Path 2083" transform="translate(-393.367 -393.368)"/>
														</g>
													</g>
												</g>
											</svg>

											{/* <img src="/media/authentication.svg" alt="" /> */}
										</div>
										<div className="dummy-box-height"></div>
										<h3>Viewability</h3>
										<p>Minimize your loss and improve the ROI for every advertising dollar spent by ensuring highest viewability for the ads</p>
										
									</div>
								</div>

								<div className="col-md-4">
									<div className="box wow fadeInRight" data-wow-delay=".4s">
										<div className="box-icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="73.571" height="73.8" viewBox="0 0 73.571 73.8">
												<defs>
													<style>
														{/* .cls-1{fill:#00bce3} */}
													</style>
												</defs>
												<g id="sports" transform="translate(-1 -1)">
													<path fill="#00bce3" id="Path_2084" d="M52.833 51.567a8.691 8.691 0 0 0 1.542-3.05L73.12 62.851l1.451-1.9-19.852-15.177a8.7 8.7 0 0 0-2.859-6.1l-8.691-7.823 3.727-5.59L59.2 29.618a1.195 1.195 0 0 0 1.472-.862l1.194-4.777A1.194 1.194 0 0 0 61 22.531l-13.68-3.42a6.7 6.7 0 0 0-7.13 2.757l-10.53 15.79v-3.727a5.974 5.974 0 0 0 3.583-5.465v-2.388a5.974 5.974 0 0 0-3.583-5.465V2.194A1.194 1.194 0 0 0 28.466 1H2.194A1.194 1.194 0 0 0 1 2.194v35.825a1.194 1.194 0 0 0 1.194 1.194h26.272a1.164 1.164 0 0 0 .182-.037l-3.209 4.814H11.748a1.193 1.193 0 0 0-1.194 1.194v4.777a1.193 1.193 0 0 0 1.194 1.194H29.66a1.191 1.191 0 0 0 .971-.5l5.213-7.3 6.5 5.574-6.764 8.7a5.444 5.444 0 0 0 1.031 7.7L49.245 74.8l1.432-1.911-12.63-9.473a3.053 3.053 0 0 1-.578-4.318l7.464-9.6a1.193 1.193 0 0 0-.166-1.64l-8.36-7.158a1.191 1.191 0 0 0-1.747.213l-5.615 7.858h-16.1v-2.392h13.133a1.2 1.2 0 0 0 .994-.531l15.1-22.655a4.29 4.29 0 0 1 4.564-1.765l12.521 3.13-.609 2.435-11.958-3.262a1.2 1.2 0 0 0-1.308.49l-4.777 7.165a1.2 1.2 0 0 0 .195 1.55l9.459 8.513a6.307 6.307 0 0 1 .706 8.627l-7.91 9.887a1.2 1.2 0 0 0 .125 1.626l14.33 13.136 1.615-1.761-13.5-12.38 4.44-5.549 23.129 15.036 1.3-2L51.56 53.158zM30.854 26.078v2.388a3.583 3.583 0 1 1-7.165 0v-2.388a3.583 3.583 0 1 1 7.165 0zM8.165 3.388H22.5v2.389H8.165zm19.107 33.437H3.388V3.388h2.389v3.583a1.194 1.194 0 0 0 1.194 1.194h16.718a1.194 1.194 0 0 0 1.194-1.194V3.388h2.388v16.719a5.978 5.978 0 0 0-5.971 5.971v2.388a5.978 5.978 0 0 0 5.971 5.971z" className="cls-1" data-name="Path 2084"/>
													<path fill="#00bce3" id="Path_2085" d="M1 45h13.136v2.388H1z" className="cls-1" data-name="Path 2085" transform="translate(0 8.544)"/>
													<path fill="#00bce3" id="Path_2086" d="M8 49h13.136v2.388H8z" className="cls-1" data-name="Path 2086" transform="translate(1.359 9.32)"/>
													<path fill="#00bce3" id="Path_2087" d="M2 53h2.388v2.388H2z" className="cls-1" data-name="Path 2087" transform="translate(.194 10.097)"/>
													<path fill="#00bce3" id="Path_2088" d="M6 53h2.388v2.388H6z" className="cls-1" data-name="Path 2088" transform="translate(.971 10.097)"/>
													<path fill="#00bce3" id="Path_2089" d="M10 53h17.913v2.388H10z" className="cls-1" data-name="Path 2089" transform="translate(1.748 10.097)"/>
													<path fill="#00bce3" id="Path_2090" d="M24.107 13.971v-2.388h-2.944l-2.034-3.052a1.194 1.194 0 0 0-2.091.192l-2.485 5.8-2.485-5.8a1.193 1.193 0 0 0-1.941-.374l-3.233 3.234H5v2.388h2.388a1.189 1.189 0 0 0 .844-.35l2.336-2.336 2.888 6.739a1.194 1.194 0 0 0 2.195 0l2.714-6.333 1.166 1.748a1.2 1.2 0 0 0 .994.531z" className="cls-1" data-name="Path 2090" transform="translate(.777 1.359)"/>
													<path fill="#00bce3" id="Path_2091" d="M5 19h10.748v2.388H5z" className="cls-1" data-name="Path 2091" transform="translate(.777 3.495)"/>
													<path fill="#00bce3" id="Path_2092" d="M5 23h10.748v2.388H5z" className="cls-1" data-name="Path 2092" transform="translate(.777 4.272)"/>
													<path fill="#00bce3" id="Path_2093" d="M5 27h10.748v2.388H5z" className="cls-1" data-name="Path 2093" transform="translate(.777 5.049)"/>
												</g>
											</svg>
											{/* <img src="/media/authentication.svg" alt="" /> */}
										</div>
										<div className="dummy-box-height"></div>
										<h3>Competitive Separation</h3>
										<p>Keep your ads adequately separated from your competitors and stand out to make a fresh impression on your customers</p>
										
									</div>
								</div>

								<div className="col-md-4">
									<div className="box wow fadeInLeft" data-wow-delay=".6s">
										<div className="box-icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="74.419" height="74.418" viewBox="0 0 74.419 74.418">
												<defs>
													<style>
														{/* .cls-1{fill:#00bce3} */}
													</style>
												</defs>
												<g id="fraud" transform="translate(0 -.235)">
													<path fill="#00bce3" id="Path_2094" d="M85.65 59.886a26 26 0 1 0-26 26 26 26 0 0 0 26-26zm-49.515 0a23.519 23.519 0 1 1 23.519 23.52 23.52 23.52 0 0 1-23.518-23.52zm0 0" className="cls-1" data-name="Path 2094" transform="translate(-28.614 -28.611)"/>
													<path fill="#00bce3" id="Path_2095" d="M66.791 60.024L64.163 57.4a2.455 2.455 0 0 0-1.749-.726 2.465 2.465 0 0 0-.634.092l-3.113-3.116a2.467 2.467 0 0 0-.632-2.384l-1.9-1.911a30.992 30.992 0 1 0-7 7l1.9 1.911a2.41 2.41 0 0 0 2.384.631l3.111 3.112a2.409 2.409 0 0 0 .633 2.383l2.624 2.624 6.124 6.124a4.951 4.951 0 1 0 7-7zM2.57 31.274a28.471 28.471 0 1 1 50.473 18.048l-.09.109a28.753 28.753 0 0 1-3.742 3.743l-.133.111A28.455 28.455 0 0 1 2.57 31.274zM51.6 54.381c.236-.21.467-.425.7-.642q.627-.594 1.221-1.221c.215-.227.428-.456.636-.689.15-.168.312-.324.458-.5l1.675 1.683-3.5 3.5-1.676-1.687c.169-.144.323-.3.488-.452zm5.564 1.263l2.626 2.626-1.75 1.75-2.63-2.626zm5.252 3.5l1.746 1.756-3.5 3.5-1.751-1.751zM71.165 71.4a2.535 2.535 0 0 1-3.5 0l-5.252-5.252 3.5-3.5 5.252 5.252a2.476 2.476 0 0 1 0 3.5zm0 0" className="cls-1" data-name="Path 2095"/>
													<path fill="#00bce3" id="Path_2096" d="M121.758 111.921a13.709 13.709 0 0 1 2.211-2.595 7.272 7.272 0 0 0 2.688-6.513 6.615 6.615 0 0 0 2.671-4.219c.488-4.206-.663-4.745-1.1-4.948a2.035 2.035 0 0 0-.834-.192v-.638c2.821-1.324 4.516-3.162 4.516-5.256 0-2.538-2.445-4.724-6.7-6.084a23.452 23.452 0 0 0-1.485-4.832 2.48 2.48 0 0 0-3.643-1.042c-.2.132-.41.289-.644.46a6.327 6.327 0 0 1-3.619 1.6 6.324 6.324 0 0 1-3.619-1.6c-.233-.17-.447-.327-.643-.459a2.477 2.477 0 0 0-3.641 1.041 23.42 23.42 0 0 0-1.487 4.834c-4.257 1.36-6.7 3.546-6.7 6.084 0 2.094 1.7 3.932 4.517 5.256 0 .211-.007.434-.005.637a2.034 2.034 0 0 0-.834.194c-.434.2-1.586.742-1.093 4.99a6.613 6.613 0 0 0 2.667 4.177 7.272 7.272 0 0 0 2.687 6.514 13.667 13.667 0 0 1 2.211 2.595c.992 1.411 2.019 2.871 4.475 2.871h2.935c2.457 0 3.483-1.46 4.475-2.871zm-14.992-16.875a33.213 33.213 0 0 1-.052-1.287 29.4 29.4 0 0 0 6.484 1.129l.357.024c.286.017.572.034.864.045.053 0 .1.008.158.009v1.828a8.427 8.427 0 0 1-3.714.668 4.867 4.867 0 0 1-4.1-2.416zm10.287-.08c.054 0 .1-.008.158-.009.292-.011.577-.028.864-.045l.357-.024a29.4 29.4 0 0 0 6.484-1.129c-.007.454-.028.874-.052 1.287a4.87 4.87 0 0 1-4.1 2.416 8.5 8.5 0 0 1-3.714-.663zm-6.878-17.307c.169.114.354.249.555.4a7.264 7.264 0 0 0 10.171 0c.2-.148.385-.283.566-.391a22.235 22.235 0 0 1 1.484 5.232c.044.269.078.535.112.8.024.188.052.373.071.565.036.361.059.717.076 1.07 0 .1.016.191.019.289a16.31 16.31 0 0 1-6.15 1.879c-.41.037-.831.057-1.263.057a14.743 14.743 0 0 1-3.548-.448 16.693 16.693 0 0 1-3.868-1.492c0-.1.014-.19.019-.286.018-.355.04-.712.077-1.074.019-.191.047-.375.071-.562.033-.266.068-.533.111-.8a21.9 21.9 0 0 1 1.5-5.238zm-7.976 9.9c0-1.155 1.447-2.387 3.81-3.327-.008.082 0 .16-.011.242-.05.61-.085 1.224-.085 1.847a1.238 1.238 0 0 0 .551 1.03 17.636 17.636 0 0 0 18.7 0 1.238 1.238 0 0 0 .552-1.03c0-.623-.036-1.238-.085-1.848-.006-.081 0-.159-.011-.241 2.363.94 3.81 2.172 3.81 3.327s-1.428 2.378-3.809 3.32c-.165.066-.339.125-.51.187a26.923 26.923 0 0 1-7.657 1.4c-.073 0-.145.01-.218.013q-.7.029-1.422.029t-1.422-.029c-.074 0-.146-.01-.219-.013a26.923 26.923 0 0 1-7.657-1.4c-.17-.062-.345-.121-.509-.187-2.381-.941-3.807-2.164-3.807-3.319zm9.7 22.937a15.944 15.944 0 0 0-2.6-3.03c-1.988-1.748-1.919-3.153-1.823-5.1l.01-.2a1.241 1.241 0 0 0-.561-1.1 1.169 1.169 0 0 0-.234-.118 3.97 3.97 0 0 1-1.927-2.646 13.1 13.1 0 0 1-.079-1.928 7.311 7.311 0 0 0 6.182 3.558 10.475 10.475 0 0 0 4.951-.992 10.479 10.479 0 0 0 4.952.992 7.311 7.311 0 0 0 6.181-3.558 13.062 13.062 0 0 1-.072 1.878 3.968 3.968 0 0 1-1.934 2.7 1.163 1.163 0 0 0-.233.118 1.24 1.24 0 0 0-.561 1.1l.01.2c.1 1.943.165 3.349-1.823 5.1a15.944 15.944 0 0 0-2.6 3.03c-.971 1.383-1.333 1.82-2.45 1.82h-2.935c-1.117 0-1.478-.437-2.45-1.82zm0 0" className="cls-1" data-name="Path 2096" transform="translate(-84.775 -63.712)"/>
													<path fill="#00bce3" id="Path_2097" d="M211.668 273.761a1.241 1.241 0 0 0-1.748-.009 3.077 3.077 0 0 1-1.6.879 1.238 1.238 0 0 0 0 2.476 5.437 5.437 0 0 0 3.351-1.6 1.234 1.234 0 0 0-.003-1.746zm0 0" className="cls-1" data-name="Path 2097" transform="translate(-176.037 -232.215)"/>
												</g>
											</svg>
											{/* <img src="/media/authentication.svg" alt="" /> */}
										</div>
										<div className="dummy-box-height"></div>
										<h3>Fraudulent Activity Detection</h3>
										<p>Verify the humanity of the traffic by filtering out bots and eliminating bogus clicks with maximum reliability</p>
										
									</div>
								</div>

								<div className="col-md-4">
									<div className="box wow fadeInUp" data-wow-delay=".8s">
										<div className="box-icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="70.099" height="65.607" viewBox="0 0 70.099 65.607">
												<defs>
													<style>
														{/* .cls-1{fill:#00bce3} */}
													</style>
												</defs>
												<g id="banner" transform="translate(0 -16.404)">
													<path fill="#00bce3" id="Path_2098" d="M303.3 156.891a1.027 1.027 0 0 0-1.864 0l-2.57 5.555a1.027 1.027 0 0 0 1.864.862l.079-.172h3.118l.079.172a1.027 1.027 0 1 0 1.864-.862zm-1.541 4.192l.609-1.316.609 1.316z" className="cls-1" data-name="Path 2098" transform="translate(-257.857 -120.738)"/>
													<path fill="#00bce3" id="Path_2099" d="M366.633 155.69h-1.907a1.027 1.027 0 0 0-1.027 1.027v5.638a1.027 1.027 0 0 0 1.027 1.027h1.907a3.846 3.846 0 1 0 0-7.692zm0 5.638h-.88v-3.584h.88a1.792 1.792 0 1 1 0 3.584z" className="cls-1" data-name="Path 2099" transform="translate(-313.905 -120.216)"/>
													<path fill="#00bce3" id="Path_2100" d="M99.069 73.6a1.027 1.027 0 0 0-1.027-1.027H45.718a1.027 1.027 0 0 0 0 2.054h52.324a1.027 1.027 0 0 0 1.027-1.027z" className="cls-1" data-name="Path 2100" transform="translate(-38.601 -48.482)"/>
													<path fill="#00bce3" id="Path_2101" d="M71.309 114.058H45.718a1.027 1.027 0 0 0 0 2.054h25.591a1.027 1.027 0 0 0 0-2.054z" className="cls-1" data-name="Path 2101" transform="translate(-38.601 -84.284)"/>
													<path fill="#00bce3" id="Path_2102" d="M71.309 155.54H45.718a1.027 1.027 0 0 0 0 2.054h25.591a1.027 1.027 0 0 0 0-2.054z" className="cls-1" data-name="Path 2102" transform="translate(-38.601 -120.087)"/>
													<path fill="#00bce3" id="Path_2103" d="M71.309 197.021H45.718a1.027 1.027 0 0 0 0 2.054h25.591a1.027 1.027 0 0 0 0-2.054z" className="cls-1" data-name="Path 2103" transform="translate(-38.601 -155.889)"/>
													<path fill="#00bce3" id="Path_2104" d="M71.309 238.5H45.718a1.027 1.027 0 0 0 0 2.054h25.591a1.027 1.027 0 0 0 0-2.054z" className="cls-1" data-name="Path 2104" transform="translate(-38.601 -191.69)"/>
													<path fill="#00bce3" id="Path_2105" d="M69.481 52.953l-2.287-1.692V22.112a5.715 5.715 0 0 0-5.708-5.712H14.923a1.027 1.027 0 0 0 0 2.054h46.563a3.658 3.658 0 0 1 3.654 3.654v27.63l-4.7-3.476a1.023 1.023 0 0 0 .027-.231V30.8a1.027 1.027 0 0 0-1.027-1.027h-21.4a1.027 1.027 0 0 0-1.022 1.027v17.039a1.027 1.027 0 0 0 1.027 1.027h18.72v5.213H2.054V22.113a3.659 3.659 0 0 1 3.655-3.655h3.464a1.027 1.027 0 0 0 0-2.054H5.708A5.715 5.715 0 0 0 0 22.113v39.648a5.715 5.715 0 0 0 5.709 5.709H26.8v7.657h-5.692c-4.432 0-4.445 6.885 0 6.885h18.185a1.027 1.027 0 0 0 0-2.054H21.108a1.39 1.39 0 0 1 0-2.778h24.978a1.39 1.39 0 0 1 0 2.778h-.768a1.027 1.027 0 0 0 0 2.054h.768c4.432 0 4.445-6.885 0-6.885h-5.541v-7.658h20.94a5.715 5.715 0 0 0 5.709-5.709v-6.045h1.4a1.53 1.53 0 0 0 .887-2.762zm-6.884.71a1.581 1.581 0 0 0-1.217.686l-2.57 3.487V47.615l8.177 6.049zm-23.526-6.851V31.828h19.343v13.211a1.523 1.523 0 0 0-1.664 1.525v.248zm-.58 28.315h-9.638v-7.658h9.638zM65.14 61.761a3.659 3.659 0 0 1-3.655 3.655H5.708a3.659 3.659 0 0 1-3.655-3.655v-5.629h54.756v3.35a1.549 1.549 0 0 0 2.778.879l3.3-4.6h2.25v5.995z" className="cls-1" data-name="Path 2105"/>
												</g>
											</svg>

											{/* <img src="/media/authentication.svg" alt="" /> */}
										</div>
										<div className="dummy-box-height"></div>
										<h3>Ad Placement</h3>
										<p>AdProbe arms you with granulated, hyper-detailed information about your ad placements – with super simple integration</p>
										
									</div>
								</div>

								<div className="col-md-4">
									<div className="box wow fadeInRight" data-wow-delay="1s">
										<div className="box-icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="81.571" height="81.824" viewBox="0 0 81.571 81.824">
												<defs>
													<style>
														{/* .cls-1{fill:#00bce3} */}
													</style>
												</defs>
												<path fill="#00bce3" id="XMLID_2024_" d="M43.442 55.692a1.812 1.812 0 0 1-1.813 1.808H41.2a1.812 1.812 0 1 1 0-3.625h.431a1.812 1.812 0 0 1 1.811 1.817zm12.665-1.812h1.546a1.812 1.812 0 1 1 0 3.625h-1.547a14.832 14.832 0 0 1-12.88 12.881v1.544a1.812 1.812 0 1 1-3.625 0v-1.545A14.833 14.833 0 0 1 26.721 57.5h-1.546a1.812 1.812 0 1 1 0-3.625h1.546A14.833 14.833 0 0 1 39.6 41v-1.547a1.812 1.812 0 1 1 3.625 0V41a14.833 14.833 0 0 1 12.881 12.879zm-6.762 1.812a1.812 1.812 0 0 1 1.812-1.812h1.288a11.207 11.207 0 0 0-9.219-9.219v1.289a1.812 1.812 0 1 1-3.625 0v-1.29a11.207 11.207 0 0 0-9.219 9.219h1.288a1.812 1.812 0 1 1 0 3.625h-1.288a11.207 11.207 0 0 0 9.218 9.219v-1.288a1.812 1.812 0 1 1 3.625 0v1.288a11.207 11.207 0 0 0 9.22-9.223h-1.288a1.812 1.812 0 0 1-1.813-1.808zM82.2 27.794a27.57 27.57 0 0 1-8.4 19.866 1.812 1.812 0 0 1-2.533-2.593 24.365 24.365 0 0 0 4.919-6.8h-8.6a1.812 1.812 0 1 1 0-3.625h10.001a24.246 24.246 0 0 0 0-13.7H62.235a48.831 48.831 0 0 1 .477 6.848c0 .637-.013 1.3-.039 1.956a1.812 1.812 0 0 1-3.622-.142c.024-.614.036-1.224.036-1.814a44.237 44.237 0 0 0-.53-6.848H43.226v2.268a1.812 1.812 0 0 1-3.625 0v-2.263H24.27a44.238 44.238 0 0 0-.53 6.848c0 .587.012 1.2.036 1.814a1.812 1.812 0 0 1-3.622.142 50.233 50.233 0 0 1-.039-1.956 48.862 48.862 0 0 1 .477-6.848H5.241a24.246 24.246 0 0 0 0 13.7h10.005a1.812 1.812 0 1 1 0 3.625h-8.6a24.368 24.368 0 0 0 4.919 6.8 1.813 1.813 0 0 1-2.533 2.594A27.762 27.762 0 0 1 28.423 0H54.4a27.826 27.826 0 0 1 27.8 27.794zM27.331 3.649A24.211 24.211 0 0 0 6.642 17.322h14.613a35.608 35.608 0 0 1 6.076-13.673zM39.6 3.625h-7.456C28.876 6.9 26.395 11.745 25 17.322h14.6V3.625zm18.223 13.7c-1.392-5.576-3.873-10.42-7.141-13.7h-7.456v13.7zm18.361 0A24.211 24.211 0 0 0 55.5 3.649a35.608 35.608 0 0 1 6.076 13.672zm-8.639 38.37a26.133 26.133 0 1 1-26.132-26.136 26.162 26.162 0 0 1 26.133 26.133zm-3.625 0A22.508 22.508 0 1 0 41.413 78.2a22.533 22.533 0 0 0 22.509-22.508z" className="cls-1" transform="translate(-.628)"/>
											</svg>

											{/* <img src="/media/authentication.svg" alt="" /> */}
										</div>
										<div className="dummy-box-height"></div>
										<h3>Geotargeting (IP-Lookup)</h3>
										<p>Sharpened capability to target geo-specific audience with our advanced geotargeting tools of country, city and zip-code levels</p>
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>



        		<section>
					<div className="sec-3-cover">
						<div className="sec-3">
							<div className="sec-3-heading">
								<h2>Success You Can Measure</h2>
								<p></p>
							</div>
							<div className="row">
									{this.box}
							</div>
						</div>
					</div>
				</section>



        		<section>
					<div className="sec-4-cover">
						<div className="sec-4">
							<div className="row">
								<div className="col-md-6">
									<div className="sec-4-img">
										<img alt="" className="wow pulse" src="/media/usp-img.png" />
									</div>
								</div>
								<div className="col-md-6">
									<div className="sec-4-content wow pulse">
										<h2>What sets us apart?</h2>
										<p>AdProbe has incorporated multiple features to address the most critical pain points of the customers, making it the one-stop solution for all your ad-verification business needs.</p>
										<ul>
											<li>Seamless Integration</li>
											<li>Comprehensive Metrics</li>
											<li>Actionable Intelligence</li>
											<li>Proactive Monitoring</li>
										</ul>

										
										{/* <li style={{texDecoration: 'none' , listStyleType: 'none'}}><NavLink to="/about" activeClassName="active" className="">Learn more about us</NavLink></li>
									*/}
									</div> 
								</div>
							</div>
						</div>
					</div>
				</section>


			{/*	// <section>
				// 	<div className="sec-5-cover">
				// 		<div className="sec-5">
				// 			<div className="row">
				// 				<div className="col-md-1"></div>
				// 				<div className="col-md-3">
				// 					<div className="sec-5-left">
				// 						<h2>Our Customer Saying...</h2>
				// 						<p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sodales mauris eu.</p>
				// 						<Link to="/" >See success stories</Link>
				// 					</div>
										
				// 				</div>
				// 				<div className="col-md-8">
				// 					<div className="testmonial-cover">
				// 						<ul>
				// 							{this.items}
				// 						</ul>
				// 					</div>
				// 				</div>
				// 			</div>
				// 		</div>
				// 	</div>
				// </section> */}
				{this.state.infoDialog && <Dialog
        
				  open={this.state.infoDialog}
				  fullScreen={(window.innerWidth < 480) && (window.innerWidth < 768)}
                  onClose={this.showDemoSlider}
                  className="demoDialog"
                   >
					   <ScheduleDemo showDemoSlider={this.handleSubmit}/></Dialog>}
					   {this.state.msgOpen && <Dialog
        
                  open={this.state.msgOpen}
				  onClose={this.toggleMsg}
				  className="toggleMsg"
                  
                   >
					   <div className="msgContent">
					       <div >
						   <FontAwesomeIcon className="icon"   icon={faCheck}/>   
						   </div> 
						   <h1>Form Submitted</h1>
						   <p>Thank you for your visit !</p>
						   </div>
						   </Dialog>}
      </div>
    )
  }
}


export default Home;
