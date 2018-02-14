Snake Rules:
- game ticks every x ms (400?), updating position of snakes (adding direction to each segment)
  - if snake is [1,1], [1,2], [1,3] and moving down, should tick to [1,2], [1,3], [1,4] assuming no inertia
- use arrow keys to change direction of lead node
- trailing node continues to move in previous direction until it reaches the coordinate leading node was at
  when it changed direction
- add length to snake for each dot swallowed and increment score
- generate new dot at random coordinate 
Game Over: If lead node of snake intersects any part of the trailing snake, or if it intersects an edge

optional:
allow player to set size of grid
allow player to set number/frequency of dots
track play high score


input - arrow keys
function tick - takes direction of snake, updates position of snake, checks for success\fail conditions
function changeDirection - takes input and changes direction of snake
function eatApple - called when snake intersects apple, increments length of snake and score