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
            action="https://itsrighter.us15.list-manage.com/subscribe?u=15057c33d0e712bc1ade261a0&id=f1618ab55f" 
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