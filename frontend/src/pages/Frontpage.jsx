import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle'; // Import Bootstrap JavaScript
import "./Nav.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './AboutUs';
import logo from '../images/yo.png';

const Navbar = () => {
  const [username, setUsername] = useState("");
  const history = useHistory();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleQuestionClick = (index) => {
    setActiveQuestion(index === activeQuestion ? null : index);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    console.log('Submitted feedback:', feedback);
    setFeedback('');
  };

  const faqRef = useRef(null);
  const feedbackRef = useRef(null);

  const handleWhatsAppShare = () => {
    const url = window.location.href;
    const encodedUrl = encodeURIComponent(url);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const handleQuestionClick2 = (questionId) => {
    setActiveQuestion(questionId === activeQuestion ? null : questionId);
  };

  const handleFaqClick = () => {
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeedbackClick = () => {
    if (feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    history.push("/");
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 0) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='Body'>
      <section id='part1'>
      <class id='nav'>
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top ${navbarVisible ? '' : 'navbar-hidden'}`}>
          <div className='container-fluid'>
            
            <a className='navbar-brand ms-4' href='/'>Defenzio <img src={logo} alt="Logo" style={{ width: '50px', marginRight: '1px' }} /></a>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarContent' aria-controls='navbarContent' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarContent'>
              <ul className='navbar-nav ms-auto me-4'>
                <li className='nav-item'>
                  <a className='nav-link active' aria-current='page' href='/'>Home</a>
                </li>
                <li className='nav-item'>
                  {isAuthenticated ? (
                    <span className='nav-link'>{username}</span>
                  ) : (
                    <Link to='/login' className='nav-link'>Log-In</Link>
                  )}
                </li>
                <li className='nav-item dropdown'>
                  <a className='nav-link dropdown-toggle' href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'>More</a>
                  <ul className='dropdown-menu dropdown-menu-dark dropdown-menu-end'>
                    {isAuthenticated ? (
                      <>
                        <li><a href="/Upload" className='dropdown-item'>Upload</a></li>
                        <li><a className='dropdown-item' href='#' onClick={handleLogout}>Logout</a></li>
                      </>
                    ) : (
                      <li><Link to='/register' className='dropdown-item'>Sign Up</Link></li>
                    )}
                    <li><hr className='dropdown-divider' /></li>
                    <li><a className='dropdown-item small-link' href='#faq' onClick={handleFaqClick}>FAQ</a></li>
                    <li><a className='dropdown-item small-link' href='/instructions' onClick={handleFaqClick}>Instructions</a></li>
  
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </class>
        <div className="title">
          <p>Zero Day Detector</p>
        </div>
        <div className="content">
          <p>Don't compromise your network's security. Get started with our powerful network log analysis tool today and experience the peace of mind that comes with knowing your systems are safe from cyber threats.</p>
          {isAuthenticated ? (
            <p>You are logged in. Welcome, {username.split('@')[0]}!</p>
            ) : (
            <a href="/register">
              <button className="signup">Sign up</button>
            </a>
          )}
        </div>
        <br />
        <br />
        <div className="cards">
          <div className="xyz">
            <img src="https://www.seekpng.com/png/full/10-104124_line-transparent-shadow-white-vertical-line-transparent.png" style={styles.xyz} />
          </div>
          <div>
            <p className="biggertext">98%</p>
            <p className="smallertext">accuracy rate</p>
          </div>
          <div className="xyz">
            <img src="https://www.seekpng.com/png/full/10-104124_line-transparent-shadow-white-vertical-line-transparent.png" style={styles.xyz} />
          </div>
          <div>
            <p className="biggertext">ML</p>
            <p className="smallertext">Random forest as the core model</p>
          </div>
          <div className="xyz">
            <img src="https://www.seekpng.com/png/full/10-104124_line-transparent-shadow-white-vertical-line-transparent.png" style={styles.xyz} />
          </div>
          <div>
            <p className="biggertext">20s</p>
            <p className="smallertext">avg. response time</p>
          </div>
          <div className="xyz">
            <img src="https://www.seekpng.com/png/full/10-104124_line-transparent-shadow-white-vertical-line-transparent.png" style={styles.xyz} />
          </div>
        </div>
      </section>

      <section id='part3'>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://www.indusface.com/wp-content/uploads/2019/08/3-Ways-to-Prevent-Application-Zero-Day-Attacks.png" className="d-block w-100" alt="images" />
            </div>
            <div className="carousel-item">
              <img src="https://www.indusface.com/wp-content/uploads/2019/08/1-3.png" className="d-block w-100" alt="images" />
            </div>
            <div className="carousel-item">
              <img src="https://static.hindawi.com/articles/scn/volume-2021/6610675/figures/6610675.fig.003.jpg" className="d-block w-100" alt="images" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="false"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="false"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <div className="container-small">
        <section ref={faqRef} className="hexagon cursor-default">
          <div className="hexagon-content">
            <h2 className='faq'>FAQ</h2>
            <p>
              <i>Find answers to frequently asked questions about Zeroday attacks:</i>
            </p>
            <ul>
              <li onClick={() => handleQuestionClick2(0)} className={activeQuestion === 0 ? 'active' : ''}>
                <h5>What is a Zeroday attack?</h5>
                {activeQuestion === 0 && (
                  <p className="Answers">
                    A Zeroday attack refers to a cybersecurity vulnerability or exploit
                    that is unknown to the software vendor or the public. It takes
                    advantage of a security weakness that the software developer is
                    unaware of, leaving users exposed to potential attacks.
                  </p>
                )}
              </li>
              <li
                onClick={() => handleQuestionClick2(1)}
                className={activeQuestion === 1 ? 'active' : ''}
              >
                <h5>How do Zeroday attacks occur?</h5>
                {activeQuestion === 1 && (
                  <p className="Answers">
                    Zeroday attacks typically occur when a hacker discovers a
                    vulnerability in software before the software developer or vendor
                    becomes aware of it. The attacker then exploits this vulnerability
                    to carry out malicious activities, such as gaining unauthorized
                    access, stealing data, or spreading malware.
                  </p>
                )}
              </li>
              <li
                onClick={() => handleQuestionClick2(2)}
                className={activeQuestion === 2 ? 'active' : ''}
              >
                <h5>What are the consequences of a Zeroday attack?</h5>
                {activeQuestion === 2 && (
                  <p className="Answers">
                    The consequences of a Zeroday attack can be severe. It can result
                    in data breaches, financial losses, damage to a company's
                    reputation, and disruption of critical services. Additionally,
                    Zeroday attacks can be challenging to detect and mitigate since
                    there is no prior knowledge of the vulnerability.
                  </p>
                )}
              </li>
              <li onClick={() => handleQuestionClick2(3)} className={activeQuestion === 3 ? 'active' : ''}>
                <h5>
                  How can organizations protect themselves against Zero-day attacks?
                  <span className="arrow"></span>
                </h5>
                {activeQuestion === 3 && (
                  <p className="Answers">
                    Organizations can take several measures to protect themselves against Zero-day attacks:
                    <ul className='Points'>
                      <li style={{cursor:"default"}}>Regularly update software and apply security patches.</li>
                      <li style={{cursor:"default"}}>Implement robust network security measures, such as firewalls and intrusion detection systems.</li>
                      <li style={{cursor:"default"}}>Use behavior-based detection mechanisms to identify abnormal activities.</li>
                      <li style={{cursor:"default"}}>Implement multi-factor authentication to enhance access control.</li>
                      <li style={{cursor:"default"}}>Train employees on cybersecurity best practices and promote a security-conscious culture.</li>
                      <li style={{cursor:"default"}}>Partner with cybersecurity experts to conduct regular security assessments and audits.</li>
                    </ul>
                  </p>
                )}
              </li>

              <li onClick={() => handleQuestionClick2(4)} className={activeQuestion === 4 ? 'active' : ''}>
                <h5>
                  Are there any preventive measures for Zero-day attacks?
                  <span className="arrow"></span>
                </h5>
                {activeQuestion === 4 && (
                  <p className="Answers">
                    Preventing Zero-day attacks entirely is challenging due to their nature. However, organizations can take proactive measures to reduce the risk:
                    <ul className='Points'>
                      <li style={{cursor:"default"}}>Implement a robust cybersecurity framework that includes regular vulnerability assessments and patch management.</li>
                      <li style={{cursor:"default"}}>Deploy advanced threat detection systems that utilize machine learning and behavioral analysis.</li>
                      <li style={{cursor:"default"}}>Practice defense-in-depth by implementing multiple layers of security controls.</li>
                      <li style={{cursor:"default"}}>Stay informed about the latest vulnerabilities and security advisories.</li>
                      <li style={{cursor:"default"}}>Establish incident response plans to mitigate the impact of a Zero-day attack.</li>
                    </ul>
                  </p>
                )}
              </li>

              <li
                onClick={() => handleQuestionClick2(5)}
                className={activeQuestion === 3 ? 'active' : ''}
              >
                <h5>How can I get my own Network Logs?</h5>
                {activeQuestion === 5 && (
                  <p className="Answers">
                    To get your own logs please login and click{' '}
                    {isAuthenticated ? (
                      <a className="logs" href="/instructions">
                        here
                      </a>
                                        
                    ):(
                      <a className="logs" href="/login">
                        here
                      </a>
                    )
                    }

                    .
                  </p>
                )}
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div className="Footer">
        <footer className="bg-light text-dark" style={{ marginTop: '0%' }}>
          <div className="BottomContainer" style={{ paddingLeft: '10%' }}>
            {/* Footer content */}
          </div>
          <div className="text-center py-3">
            <p>
              &copy; 2024-Defenzio. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const styles = {
  whiteSection: {
    backgroundColor: 'white',
    height: '400px',
  },
  image: {
    width: '60%',
    height: '50%',
    borderRadius: '0.5em',
  },
  xyz: {
    width: "30%"
  },
};

export default Navbar;
