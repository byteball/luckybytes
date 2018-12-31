const os = require('os'),
      exec = require('child_process').execSync,
      env = process.env;

exports.gen = function () {
  return [{
    name: 'Node.js Version',
    value: process.version.replace('v', '')
  } , {
    name:  'NPM Version',
    value: exec('npm --version').toString().replace(os.EOL, '')
  }, {
    name:  'OS Type',
    value: os.type()
  }, {
    name:  'OS Platform',
    value: os.platform()
  }, {
    name:  'OS Architecture',
    value: os.arch()
  }, {
    name:  'OS Release',
    value: os.release()
  }, {
    name:  'CPU Cores',
    value: os.cpus().length
  }, {
    name:  'Gear Memory',
    value: `${env.OPENSHIFT_GEAR_MEMORY_MB}MB`
  }];
};

exports.poll = function () {
  return [{
 //   name: 'Free Memory',
 // }, {
 //   value: `${Math.round(os.freemem() / 1048576)}MB`
	name:  'User in Chat',
    value: env.NODE_USER
  }, {
	name:  'Orders in Book',
    value: env.NODE_ORDERS
  }, {
	name:  'Last Trade',
    value: env.NODE_LASTTRADE
  }, {
	name:  'Total number of trades done',
    value: env.NODE_TRADES
  }, {
	name:  'Total traded GBB',
    value: env.NODE_TOTALGBB
  }, {
	name:  'Time since last trade [m]',
    value: Math.round((Date.now() - env.NODE_LASTFIT) / 1000 / 60 , 2)
  }, {
	name:  'Time since last server update [m]',
    value: Math.round((Date.now() - env.NODE_CHATONLINE) / 1000 / 60 , 2)
  } 
//    name:  'Last Action:',
//    value: env.NODE_STATUS
//  }
  ];
};

exports.chart = function () {
  return [{
    bdata: 'test',
    sdata: 'test2'
  }];
};


