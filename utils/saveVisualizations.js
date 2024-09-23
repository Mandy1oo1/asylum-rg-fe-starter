export const saveSvg = () => {
  let getSvg = document.querySelector('.main-svg');
  getSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  let svgData = getSvg.outerHTML;
  let svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  let svgUrl = URL.createObjectURL(svgBlob);
  let downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = 'asylum-data';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const savePng = () => {
  let ele = document
    .querySelector('.svg-container')
    .getElementsByClassName('modebar');
  for (let i = 0; i < ele.length; i++) {
    ele[i].getElementsByClassName('modebar-btn')[0].click();
  }
};
