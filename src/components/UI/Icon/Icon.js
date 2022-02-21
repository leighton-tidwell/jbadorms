const icons = {
  addSharp: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  arrowBackSharp:
    'M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z',
  arrowBackIosSharp:
    'M17.51 3.87L15.73 2.1L5.84 12l9.9 9.9l1.77-1.77L9.38 12l8.13-8.13z',
  arrowDropDownFilled: 'M7 10l5 5l5-5z',
  arrowDropUpFilled: 'M7 14l5-5l5 5z',
  arrowForwardIosSharp: 'M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z',
  arrowRightFilled: 'M10 17l5-5l-5-5v10z',
  arrowRightAltFilled: 'M16.01 11H4v2h12.01v3L20 12l-3.99-4z',
  barChartSharp: 'M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z',
  calendarTodaySharp: 'M22 3h-3V1h-2v2H7V1H5v2H2v20h20V3zm-2 18H4V8h16v13z',
  checklistSharp:
    'M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11L2 7.46l1.41-1.41l2.12 2.12l4.24-4.24l1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41l2.12 2.12l4.24-4.24l1.41 1.41L5.54 19z',
  checkBoxSharp:
    'M21 3H3v18h18V3zM10 17l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  closeOutlined:
    'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z',
  deleteForeverSharp:
    'M6 21h12V7H6v14zm2.46-9.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z',
  editSharp:
    'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z',
  errorFilled:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  emojiPeopleSharp:
    'M15.89 8.11C15.5 7.72 14.83 7 13.53 7h-2.54C8.24 6.99 6 4.75 6 2H4c0 3.16 2.11 5.84 5 6.71V22h2v-6h2v6h2V10.05L18.95 14l1.41-1.41l-4.47-4.48z',
  infoOutlined:
    'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z',
  menuSharp: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  openInNewSharp:
    'M19 19H5V5h7V3H3v18h18v-9h-2v7zM14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3h-7z',
  peopleSharp:
    'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  phoneAndroidSharp: 'M19 1H5v22h14V1zm-5 20h-4v-1h4v1zm3-3H7V4h10v14z',
  pinDropFilled:
    'M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2a2 2 0 1 1-4 0zM5 20v2h14v-2H5z',
  searchSharp:
    'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z',
  warehouseSharp:
    'M22 21V7L12 3L2 7v14h5v-9h10v9h5zm-11-2H9v2h2v-2zm2-3h-2v2h2v-2zm2 3h-2v2h2v-2z'
};

const Icon = ({ size = '24', color = 'white', name }) => {
  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
      {name === 'emojiPeopleSharp' && (
        <circle cx={12} cy={4} r={2} fill={color}></circle>
      )}
      <path d={icons[name]}></path>
    </svg>
  );
};

export default Icon;
