import React from "react";
import './Subscribe.css';

const Subscribe = () => {
  return (
    <div>
      <div className="newsletter-section">
        <h3>Sign Up</h3>
        <p className="newsletter-description">
          Submit your email to receive new loop packs sent directly to your inbox whenever they're released. 
          You can unsubscribe at any time.
        </p>
        <div className="newsletter-form">
          <form 
            action="https://itsrighter.us2.list-manage.com/subscribe/post?u=44e32ac3eaad1a9231c74cb97&amp;id=3dc23df12b" 
            method="post" 
            target="_blank"
            className="mailchimp-form"
          >
            <input 
              type="email" 
              name="EMAIL" 
              placeholder="email address" 
              required 
              className="email-input"
            />
            <input 
              type="submit" 
              value="Subscribe" 
              name="subscribe" 
              className="subscribe-button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;