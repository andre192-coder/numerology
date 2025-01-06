import React, { useState } from 'react';
    import {
      calculateLifePathNumber,
      calculateDestinyNumber,
      calculateSoulUrgeNumber,
      calculatePersonalityNumber,
      calculateBirthdayNumber,
      calculateMaturityNumber
    } from './numerology';
    import { numberMeanings } from './meanings';
    import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
    import './index.css';

    function App() {
      const [name, setName] = useState('');
      const [birthdate, setBirthdate] = useState('');
      const [lifePathNumber, setLifePathNumber] = useState(null);
      const [destinyNumber, setDestinyNumber] = useState(null);
      const [soulUrgeNumber, setSoulUrgeNumber] = useState(null);
      const [personalityNumber, setPersonalityNumber] = useState(null);
      const [birthdayNumber, setBirthdayNumber] = useState(null);
      const [maturityNumber, setMaturityNumber] = useState(null);

      const handleNameChange = (event) => {
        setName(event.target.value);
      };

      const handleBirthdateChange = (event) => {
        setBirthdate(event.target.value);
      };

      const handleSubmit = () => {
        if (birthdate) {
          const lifePath = calculateLifePathNumber(birthdate);
          setLifePathNumber(lifePath);
          setBirthdayNumber(calculateBirthdayNumber(birthdate));
          if (destinyNumber !== null) {
            setMaturityNumber(calculateMaturityNumber(lifePath, destinyNumber));
          }
        }
        if (name) {
          setDestinyNumber(calculateDestinyNumber(name));
          setSoulUrgeNumber(calculateSoulUrgeNumber(name));
          setPersonalityNumber(calculatePersonalityNumber(name));
          if (lifePathNumber !== null) {
            setMaturityNumber(calculateMaturityNumber(lifePathNumber, calculateDestinyNumber(name)));
          }
        }
      };

      const handleShare = (platform) => {
        let shareText = "Check out my Numerology results:\n";
        if (lifePathNumber) {
          shareText += `Life Path Number: ${lifePathNumber} - ${numberMeanings[lifePathNumber]}\n`;
        }
        if (destinyNumber) {
          shareText += `Destiny Number: ${destinyNumber} - ${numberMeanings[destinyNumber]}\n`;
        }
        if (soulUrgeNumber) {
          shareText += `Soul Urge Number: ${soulUrgeNumber} - ${numberMeanings[soulUrgeNumber]}\n`;
        }
        if (personalityNumber) {
          shareText += `Personality Number: ${personalityNumber} - ${numberMeanings[personalityNumber]}\n`;
        }
        if (birthdayNumber) {
          shareText += `Birthday Number: ${birthdayNumber} - ${numberMeanings[birthdayNumber]}\n`;
        }
        if (maturityNumber) {
          shareText += `Maturity Number: ${maturityNumber} - ${numberMeanings[maturityNumber]}\n`;
        }

        const shareUrl = window.location.href;

        if (platform === 'x') {
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        } else if (platform === 'facebook') {
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        } else if (platform === 'whatsapp') {
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`, '_blank');
        } else if (navigator.share) {
          navigator.share({
            title: 'Numerology Results',
            text: shareText,
            url: shareUrl,
          });
        } else {
          navigator.clipboard.writeText(shareText + '\n' + shareUrl).then(() => {
            alert('Results copied to clipboard!');
          }, (err) => {
            console.error('Could not copy text: ', err);
            alert('Could not copy results to clipboard.');
          });
        }
      };

      return (
        <div className="container">
          <h1>Numerology App</h1>
          <div className="input-group">
            <label htmlFor="name">Enter your name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="birthdate">Enter your birthdate (YYYY-MM-DD):</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={handleBirthdateChange}
            />
          </div>
          <button onClick={handleSubmit}>Calculate</button>

          <div className="results-container">
            {lifePathNumber !== null && (
              <div className="result-card">
                <h3>Life Path Number</h3>
                <p><b>{lifePathNumber}</b>: {numberMeanings[lifePathNumber]}</p>
              </div>
            )}

            {destinyNumber !== null && (
              <div className="result-card">
                <h3>Destiny Number</h3>
                <p><b>{destinyNumber}</b>: {numberMeanings[destinyNumber]}</p>
              </div>
            )}

            {soulUrgeNumber !== null && (
              <div className="result-card">
                <h3>Soul Urge Number</h3>
                <p><b>{soulUrgeNumber}</b>: {numberMeanings[soulUrgeNumber]}</p>
              </div>
            )}

            {personalityNumber !== null && (
              <div className="result-card">
                <h3>Personality Number</h3>
                <p><b>{personalityNumber}</b>: {numberMeanings[personalityNumber]}</p>
              </div>
            )}

            {birthdayNumber !== null && (
              <div className="result-card">
                <h3>Birthday Number</h3>
                <p><b>{birthdayNumber}</b>: {numberMeanings[birthdayNumber]}</p>
              </div>
            )}

            {maturityNumber !== null && (
              <div className="result-card">
                <h3>Maturity Number</h3>
                <p><b>{maturityNumber}</b>: {numberMeanings[maturityNumber]}</p>
              </div>
            )}
          </div>

          <div className="share-buttons">
            <button onClick={() => handleShare('x')} className="share-button x">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              Share on X
            </button>
            <button onClick={() => handleShare('facebook')} className="share-button facebook">
              <FaFacebook /> Share on Facebook
            </button>
            <button onClick={() => handleShare('whatsapp')} className="share-button whatsapp">
              <FaWhatsapp /> Share on WhatsApp
            </button>
          </div>
        </div>
      );
    }

    export default App;
