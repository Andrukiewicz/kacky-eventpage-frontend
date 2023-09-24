import React from 'react';
import PropTypes from 'prop-types';

const KrLogo2023 = ({ width, color }) => (
  <svg
    width={width}
    fill={color}
    version='1.1'
    id='Layer_1'
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    viewBox='0 -18 500 186.38'
    xmlSpace='preserve'
  >
    <path
      d='M76.24,22.2c-2.22,0-4.57,2.35-6.66,4.05L54.64,39.17l6.66,15.28c0.78,1.83,1.83,4.05,4.05,4.05h55.5l-7.25,22.2H52.46
	c-4.57,0-5.71-1.29-7.83-7.97c-2.13-6.68-9.82-30.81-9.82-30.81L22.2,80.69H0L26.26,0h22.2L36.36,36.82L68.96,7.97
	C73.14,4.31,77.44,0,82.01,0h57.85l-7.2,22.2L76.24,22.2z'
    />
    <path
      d='M131.42,50.4c1.04-3.53,4.57-6.14,8.1-6.14h60.98l1.31-4.44c0.65-1.7-0.39-3.13-2.09-3.13h-63.85l4.7-14.49h77.17
	c3.53,0,5.35,2.61,4.18,6.01L205,80.69h-77.3c-3.53,0-5.35-2.61-4.18-6.14L131.42,50.4z M143.43,63.2c-0.52,1.7,0.4,3,2.09,3h47.83
	l2.52-7.7h-47.8c-1.7,0-3.66,1.44-4.18,3.13L143.43,63.2z'
    />
    <path
      d='M300.91,66.2l-4.64,14.49h-77.3c-3.39,0-5.35-2.61-4.18-6.14l15.08-46.35c1.18-3.4,4.44-6.01,7.97-6.01h77.3l-4.7,14.49
	h-63.98c-1.7,0-3.66,1.44-4.18,3.13l-7.57,23.24c-0.52,1.7,0.39,3.13,2.09,3.13H300.91z'
    />
    <path
      d='M346.53,0L331.6,45.83l20.37-17.63c3.13-2.74,6.53-6.01,10.05-6.01h44.53l-4.7,14.49h-36.82c-1.7,0-3.52,1.96-5.09,3.13
	l-14.76,11.62l3.79,11.75c0.52,1.57,1.45,3,3.14,3l40.12,0l-4.81,14.49h-47.71c-3.53,0-4.64-2.05-6.14-6.14
	c-1.5-4.09-6.02-16.45-6.02-16.45c-3.13,9.92-2.94,9.53-7.25,22.59h-16.19L330.34,0L346.53,0z'
    />
    <path
      d='M481.5,22.2l-14.36,44h-47.79c-1.7,0-2.61-1.44-2.09-3.13l13.32-40.87h-16.19l-17.04,52.36c-1.17,3.53,0.78,6.14,4.18,6.14
	h60.85l-1.44,4.44c-0.39,1.7-2.48,3.13-4.18,3.13H413.7l-4.72,14.49h56.4c3.53,0,7.18-2.61,8.1-6.01l24.35-74.56H481.5z'
    />
    <polygon points='248.76,88.27 244.05,102.76 260.25,102.76 264.96,88.27 ' />
    <polygon points='317.75,102.76 400.96,102.76 405.74,88.27 322.47,88.27 ' />
    <polygon points='268.18,102.76 309.75,102.76 314.53,88.27 272.89,88.27 ' />
  </svg>
);

KrLogo2023.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
};

KrLogo2023.defaultProps = {
  color: '#FFFFFF',
  width: '400px',
};

export default KrLogo2023;
