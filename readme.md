Build Instructions:
 - node and npm installed
 - npm install
 - npm run build
 - open on (local) webserver

Snake Rules:
- game ticks every x ms updating position of snakes (adding direction to each segment)
  - if snake is [1,1], [1,2], [1,3] and moving down
- use arrow keys to change direction of lead node
- trailing node continues to move in previous direction until it reaches the coordinate leading node was at
- add length to snake for each dot swallowed and increment score
- generate new dot at random coordinate 
- Game Over: If lead node of snake intersects any part of the trailing snake, or if it intersects an edge,  or (win) if     there aren't any free spaces left


input - arrow keys

Left Todo:
- Use requestAnimationFrame instead setInterval
- resolve bug where if after eating at least one fruit, inputting direction opposite direction key causes loss
- increase framerate after eating each fruit
- array manipulations instead of nested loops for 2d arrays