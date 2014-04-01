var gith = require('gith').create( 9001 );
// Import execFile, to run our bash script
var execFile = require('child_process').execFile;

gith({
  repo: 'fideloper/example'
}).on( 'all', function( payload ) {
  if( payload.branch === 'master' )
  {
    // Exec a shell script
    execFile('/path/to/hook.sh', function(error, stdout, stderr) {
      // Log success in some manner
      console.log( 'exec complete' );
    });
  }
});