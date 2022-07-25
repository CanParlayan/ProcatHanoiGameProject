'use strict';
/*
tower_of_hanoi.js
Created by Douile (https://github.com/Douile/)
For licensing see LICENSE (MIT)
*/

function map(value,oMin,oMax,nMin,nMax) {
  return ((value-oMin)/(oMax-oMin))*(nMax-nMin)+nMin;
}

function Stack(size) {
  var stack = new Uint8Array(size);
  Object.defineProperties(stack,{
    'position': {
      'value': 0,
      'writable': true,
    },
    'add': {
      'value': function(value) {
        if (this.position >= this.byteLength) throw new Error('Stack already full');
        this[this.position] = value;
        return this.position += 1;
      },
    },
    'remove': {
      'value': function() {
        if (this.position < 1) throw new Error('Stack empty');
        this.position -= 1;
        let value = this[this.position];
        return value;
      },
    },
    'peek': {
      'value': function() {
        if (this.position > 0) {
          return this[this.position-1];
        }
        return null;
      },
    },
  });
  return stack;
}

function Modal(name,options) {
  let template = document.querySelector(`#${name}`);
  if (template === null) throw new Error(`Could not find modal ${name}`);
  if (!options) options = {};

  let html = template.innerHTML;
  let regex = /\$[^\$\n]+\$/g;
  let variables = html.match(regex);
  if (variables !== null) {
    for (let variable of variables) {
      let name = variable.substr(1,variable.length-2);
      html = html.replace(variable,name in options ? options[name] : '');
    }
  }

  let newNode = document.createElement('template');
  newNode.innerHTML = html;

  let root = document.importNode(newNode.content,true);

  document.querySelector('.container-modal').appendChild(root);

  return root;
}

function App() {
  const PADDING = 0.2;
  const WIDTH = 0.1;
  const HEIGHT = 0.9;

  var app = {};
  Object.defineProperties(app,{
    '_canvas': {
      'enumerable': false,
      'writable': true,
    },
    'canvas': {
      'enumerable': false,
      'get': function() {
        return this._canvas ? this._canvas : this._canvas = document.getElementById('game-canvas');
      },
    },
    '_context': {
      'enumerable': false,
      'writable': true,
    },
    'context': {
      'enumerable': false,
      'get': function() {
        return this._context ? this._context : this._context = this.canvas.getContext('2d');
      },
    },
    'width': {
      'get': function() {
        return this.canvas.width;
      },
      'set': function(value) {
        return this.canvas.width = value;
      },
    },
    'height': {
      'get': function() {
        return this.canvas.height;
      },
      'set': function(value) {
        return this.canvas.height = value;
      },
    },
    '_selected': {
      'enumerable': false,
      'writable': true,
      'value': 0,
    },
    'selected': {
      'get': function() {
        return this._selected;
      },
      'set': function(value) {
        if (this.floating !== null) {
          if (value < 0) {
            this._selected = this.nTowers-1;
          } else if (value >= this.nTowers) {
            this._selected = 0;
          } else {
            this._selected = value;
          }
        } else {
          if (value < this._selected) {
            for (let i=value;i>=0;i-=1) {
              if (this.towers[i].position > 0) return this._selected = i;
            }
            for (let i=this.nTowers-1;i>value;i-=1) {
              if (this.towers[i].position > 0) return this._selected = i;
            }
          } else if (value > this._selected) {
            for (let i=value;i<this.nTowers;i++) {
              if (this.towers[i].position > 0) return this._selected = i;
            }
            for (let i=0;i<value;i++) {
              if (this.towers[i].position > 0) return this._selected = i;
            }
          }
        }
      },
    },
    '_nTowers': {
      'enumerable': false,
      'writable': true,
    },
    'nTowers': {
      'get': function() {
        return this._nTowers;
      },
      'set': function(value) {
        if (value > 1) {
          this._nTowers = value;
          this.buildTowers();
        }
      },
    },
    '_nRings': {
      'enumerable': false,
      'writable': true,
    },
    'nRings': {
      'get': function() {
        return this._nRings;
      },
      'set': function(value) {
        if (value > 1) {
          this._nRings = value;
          this.buildTowers();
        }
      },
    },
    '_acceptInput': {
      'value': true,
      'writable': true,
      'enumerable': false,
    },
    'buildTowers': {
      'value': function() {
        if (!isNaN(this.nRings) && !isNaN(this.nTowers)) {
          this.floating = null;
          if (this.nTowers === 3) this.minMoves = 2**this.nRings - 1;
          else this.minMoves = null;
          this.moves = 0;
          this.playKey = 0;

          delete this.towers;
          this.towers = new Array(this.nTowers);
          for (let i=0;i<this.nTowers;i++) {
            let stack = Stack(this.nRings);
            if (i===0) {
              for (let j=1;j<=this.nRings;j++) {
                stack.add(this.nRings-j);
              }
            }
            this.towers[i] = stack;
          }
          this.selected = 0;
        }
      }
    },
    'initialize': {
      'value': function(width,height) {
        console.log('App starting');
        this.width = width;
        this.height = height;
        this.floating = null;
        this.nTowers = 3;
        this.nRings = 3;
        console.log(this.sizes(this.nTowers,this.nRings));
        var _app = this;
        window.addEventListener('keydown',function(event) {
          _app.onKey(event);
        });
        this.context.font = '10px consolas';
        this.draw();
        document.querySelector('.container-loading').style.opacity = 0;
        return this;
      },
    },
    'onKey': {
      'value': function(event) {
        if (this._acceptInput) {
          switch(event.keyCode) {
            case 39:
            case 68:
            this.selected += 1;
            break;
            case 37:
            case 65:
            this.selected -= 1;
            break;
            case 13:
            case 32:
            case 38:
            case 40:
            case 87:
            case 83:
            if (this.floating !== null) {
              let tower = this.towers[this.selected]
              if (tower.position === 0 || (tower.position > 0 && tower[tower.position-1] > this.floating)) {
                tower.add(this.floating);
                this.floating = null;
                this.moves += 1;
              }
            } else {
              this.floating = this.towers[this.selected].remove();
            }
            // console.log(`Completed ${this.towers[this.nTowers-1].position}/${this.nRings}`);
            if (this.towers[this.nTowers-1].position === this.nRings) {
              // alert('Well done!');
              // this.nRings += 1;
              let cont = document.querySelector('.container-game');
              cont.removeAttribute('completed');
              requestAnimationFrame(() => { cont.setAttribute('completed','') });
            }
            break;
            case 82: // r
            this.buildTowers();
            break;
          }
        }
      },
    },
    'sizes': {
      'value': function(nTowers,nRings) {
        if (isNaN(nTowers)) throw new Error('nTowers must be a number');
        if (isNaN(nRings)) throw new Error('nRings must be a number');

        let width = this.width;
        let height = this.height;

        // non-multiplicative operations may be faster
        let innerMult = 1-PADDING*2;
        let innerWidth = width*innerMult;
        let innerWidthPad = (width-innerWidth)/2;
        let innerHeight = height*innerMult;
        let innerHeightPad = (height-innerHeight)/2;

        let towerWidth = innerWidth/nTowers;
        let towerBlockWidth = towerWidth*WIDTH;
        let towerBlockPad = (towerWidth-towerBlockWidth)/2;
        let towerHeight = innerHeight*HEIGHT;
        let towerHeightPad = (innerHeight-towerHeight)/2;

        let towerPositions = new Array(nTowers);
        for (let i=0;i<nTowers;i++) {
          let x = towerWidth*i+towerBlockPad + innerWidthPad;
          let y = towerHeightPad + innerHeightPad;
          towerPositions[i] = {'x':x,'y':y};
        }

        let rings = new Array(nRings);
        let ringHeight = towerHeight/Math.max(20,Math.ceil(this.nRings*1.4));
        for (let i=0;i<nRings;i++) {
          let ringWidth = Math.floor(map(i,0,nRings,towerWidth*.3,towerWidth*.9));
          let offsetX = towerBlockPad - ((towerWidth-ringWidth)/2);
          rings[i] = {'width':ringWidth,'height':ringHeight,'offsetX':offsetX};
        }

        return {'tower': {'width':towerBlockWidth,'height':towerHeight,'positions':towerPositions},'rings':rings};
      }
    },
    'draw': {
      'value': function() {
        if (this) var _app = this;
        let frame = window.requestAnimationFrame(function() {
          _app.draw();
        });
        this.context.clearRect(0,0,this.width,this.height);

        let sizes = app.sizes(this.nTowers,this.nRings);
        for (let i=0;i<this.nTowers;i++) {
          let position = sizes.tower.positions[i];
          this.context.fillStyle = '#ffffff';
          this.context.fillRect(position.x,position.y,sizes.tower.width,sizes.tower.height);
          for (let j=0;j<this.towers[i].position;j++) {
            let ring = this.towers[i][j];
            let left = position.x-sizes.rings[ring].offsetX;
            let top = position.y+sizes.tower.height-(sizes.rings[ring].height*1.4)*(j+1);
            this.context.fillStyle = `#${Math.floor(map(ring,0,this.nRings-1,0,255)).toString(16).padStart(2,'0')}ff00`;
            this.context.fillRect(left,top,sizes.rings[ring].width,sizes.rings[ring].height);
            if (this.selected === i && this.floating === null) {
                if (j === this.towers[i].position-1) {
                  this.context.strokeStyle = '#ff0000';
                  this.context.lineWidth = '4';
                  this.context.strokeRect(left,top,sizes.rings[ring].width,sizes.rings[ring].height);
                }
            }
          }
          if (this.selected === i && this.floating !== null) {
            let ring = sizes.rings[this.floating];
            let left = position.x-ring.offsetX;
            let top = position.y - (ring.height*1.4);
            this.context.fillStyle = '#00ff00';
            this.context.fillRect(left,top,ring.width,ring.height);
          }
        }

        this.context.fillStyle = '#ffffff';
        this.context.textAlign = 'right';
        this.context.font = '80pt consolas';
        this.context.fillText(`${this.moves}/${this.minMoves}`,this.width,100);
      },
    },
    'play': {
      'value': function() {
        function *moveGenerator(n,source,dest,spare) {
          if (n > 0) {
            yield * moveGenerator(n-1,source,spare,dest);
            yield [ source,dest ];
            yield * moveGenerator(n-1,spare,dest,source);
          }
        }
        this._acceptInput = false;
        this.buildTowers();
        var moves = new Array();
        var generator = moveGenerator(this.nRings,0,2,1);
        var app = this;
        var playKey = new Date().getTime();
        app.playKey = playKey;

        function playNext() {
          let move = generator.next();
          if (app.playKey === playKey && !move.done && app._acceptInput === false) {
            app.towers[move.value[1]].add(app.towers[move.value[0]].remove());
            app._selected = move.value[1];
            app.moves += 1;
            setTimeout(playNext,100);
          } else {
            app._acceptInput = true;
            document.querySelector('.overlay-auto').setAttribute('paused','');
          }
        }
        playNext();
      }
    },
    'stop': {
      'value': function() {
        this._acceptInput = true;
      }
    },
  });
  return app;
}

var _app = App().initialize(4000,4000);
window.addEventListener('click',(e) => {
  var prevent = 0;
  e.target.classList.forEach((className) => {
    switch(className) {
      case 'overlay-settings':
      console.log('Toggling settings overlay');
      break;
      case 'overlay-auto':
      let paused = e.target.hasAttribute('paused');
      if (paused) {
        _app.play();
        e.target.removeAttribute('paused');
      } else {
        _app.stop();
        e.target.setAttribute('paused','');
      }
      break;
      case 'overlay-plus':
      _app.nRings += 1;
      break;
      case 'overlay-minus':
      if (_app.nRings > 3) _app.nRings -= 1;
      break;
      case 'modal-background':
      document.querySelector('.container-modal').innerHTML = '';
      break;
      case 'overlay-github':
      break;
      default:
      prevent += 1;
      break;
    }
  })
  if (prevent === e.target.classList.length) e.preventDefault();
})
