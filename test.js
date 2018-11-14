process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      console.log(chunk)
    }
  });
  
  process.stdin.on('end', () => {
    console.log('end');
  }); 