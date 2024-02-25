const bar = new ProgressBar.Circle('#upload', {
    duration: 2000,
    easing: 'easeInOut',
    strokeWidth: 6,
    color: '#00afd8',
    step: function(state, circle) {
      if(state.offset === 0) {
        circle.path.setAttribute('stroke', '#12e07e');
        document.querySelector('#upload .ion-ios-cloud').classList.add('done');
      }
    },
    svgStyle: {
      display: 'block',
      width: '100%'
    }
  });
  
  setTimeout(() => {
    document.getElementById('queued').style.display = 'none';
    document.getElementById('upload').style.display = 'flex';
    bar.animate(1.0);
  }, 1000); 