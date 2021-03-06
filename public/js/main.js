function buildWall(blocks, COLUMNS, SPACE) {

  for(let i = 1; i < blocks.length; i++) {
    if(i % COLUMNS === 0) {
      y = (blocks[i - COLUMNS].offsetTop + blocks[i - COLUMNS].offsetHeight) + SPACE;
      blocks[i].style.top = `${y}px`;
    } else {
      if(blocks[i - COLUMNS]) {
        y = (blocks[i - COLUMNS].offsetTop + blocks[i - COLUMNS].offsetHeight) + SPACE;
        blocks[i].style.top = `${y}px`;
      }
      x = (blocks[i - 1].offsetLeft + blocks[i - 1].offsetWidth) + SPACE;
      blocks[i].style.left = `${x}px`;
    }
  }
}

function renderGrid() {
  
  let fallbackSrc = 'http://via.placeholder.com/256x256';
  let images = document.querySelectorAll('.image img');
  const wall = document.getElementById('wall');
  const blocks = document.getElementById('wall') ? document.getElementById('wall').children : [];
  const SPACE = 20;
  const COLUMNS = 5;

  buildWall(blocks, COLUMNS, SPACE);
  
  images.forEach(image => {
    image.addEventListener('load', function(e) {
     buildWall(blocks, COLUMNS, SPACE);
    }, false);
    image.addEventListener('error', function(e) {
      image.setAttribute('src', fallbackSrc);
    },false);
  });

}
window.addEventListener('load', renderGrid, false);
window.addEventListener('resize', renderGrid, false);
