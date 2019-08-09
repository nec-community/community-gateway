import React from 'react';
import PropTypes from 'prop-types';

import './CircleButton.scss';

export default function CircleButton(props) {
  const { icon, activeTab, desc, onCircleButtonClick } = props;

  if (!icon || !activeTab || !desc || !onCircleButtonClick) {
    return null;
  }

  return (
    <button
      key={icon}
      type="button"
      name={icon}
      className={`right-column__circle-button right-column__circle-button-${icon} ${
        icon === activeTab ? `right-column__circle-button-${icon}--active` : ''
      }`}
      onClick={onCircleButtonClick}
    >
      <div className="circle-button__icon" />
      <span className="circle-button__name">{desc}</span>
    </button>
  );
}

CircleButton.propTypes = {
  icon: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,

  onCircleButtonClick: PropTypes.func.isRequired,
};
