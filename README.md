# Patrakaar
### Patrakaar crawls Medium, like a typical Patrakaar. 

Patrakaar is a Node.js Script which is used to crawl Medium.com for all the hyperlinks available. Current depth is 2.

All the links are exported in a CSV file, ordered by Depth.

## Installation

```
git clone https://github.com/sakshamsaxena/Patrakaar.git
cd Patrakaar
npm i -g
```

## Usage

If you're on any Unix based OS : 
```
patrakaar -c 5 -u https://www.medium.com/
```

If you're using Node.js Command Prompt on Windows :
```
node Patrakaar.js -c 5 -u https://www.medium.com/
```

Here `c` is the concurrency and `-u` is the URL.

## License
MIT