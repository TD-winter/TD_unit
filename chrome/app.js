var fs = require("fs");

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
    process.stdin.pipe(process.stdout);
	fs.writeFile("test.txt", "hello world!", function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	});
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});