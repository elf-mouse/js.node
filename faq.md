Q: `gyp ERR! stack Error: EACCES: permission denied, rmdir 'build'`

A: Try using the `sudo chmod 777` command for the node_modules directory and if that doesn't work try
`sudo npm install -g --unsafe-perm`
or
`sudo node-gyp rebuild -g --unsafe-perm`
