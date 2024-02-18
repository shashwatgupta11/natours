//1 reading file syncronously
const fs = require('fs');
const readText = fs.readFileSync('PATH', 'utf-8');

//2 writing in a file syncronously
const textOut = 'ye likhna h nyi file mejo banegi';
fs.writeFileSync('path', textOut);

//3 reading file asyncronously
const data = fs.readFile('path', 'utf-8', (err, data) => {
  console.log(data);
});

//4 wirting file asyncrounously
fs.writeFile('path', 'utf-8', (err) => {
  console.log(err);
});

//5 creating server and listening to request

const server = http.createServer((req, res) => {
  res.end('hello from the server');
});

server.listen('8000', '127.0.0.1', () => {
  console.log('server running on port 8000');
});

//6 Creating server and hosting
const server1 = http.createServer((req, res) => {
  const pathName = req.params;
  if (pathName == '/') {
    res.end(
      'ha bhai ye chalega koi dikkat ki bat ni h and make more lse cases if u wish to learn',
    );
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1> page not found');
  }
});

//7 click events and handling click events
const EventEmitter = require('events');
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

myEmitter.on('shashwat', () => {
  console.log('shashwat clicked');
});
myEmitter.emit('shashwat');

//8 server pe bhi event accept kr skte h

const server2 = http.createServer();
server2.on('request', (req, res) => {
  res.end('req,response received otayyyy !');
  //9 reading and writing through streams
  const readable = fs.createWriteStream('filname');
  readable.on('data', (chunk) => {
    res.write(chunk);
  });
  //file khtm ho jaegi tb
  readable.on('end', () => {
    res.end;
  });
  // kch error agya to ye wala function
  res.on('err', () => {
    res.end('file not found');
  });

  //10 throught pipe reading and writing
  const readable1 = fs.createReadStream('filename');
  readable.pipe(res); //writing destination is res in this case
});

//11 express a node js framework
const express = require('express');
const { getAlLTours } = require('./controllers/tourController');
const { router } = require('../app');
const { schema } = require('./models/userModels');
const { default: slugify } = require('slugify');
const catchAsync = require('../after-section-09/utils/catchAsync');
const app = express;

app.get('/', (req, res) => {
  console.log('get req 1');
  res.status(200).json({
    sttaus: 'success',
    data: res,
  });
});

app.post('/', (req, res) => {
  console.log('get req 1');
  res.status(200).send('huihuiuhui');
});


//12 practicing an api 
const getTour=((req,res)=>{
  res.status(200).json({
    message:'success',
    data:res
  })
})

//13 mounting or routes 
const tarRouter=express.routes()
tarRouter.route('/').get(getallTours).post(postAllRoutes)
app.use('api/v1/tours',tarRouter)

//one more for practice

const userRouter=express.routes
userRouter.router('/:id').get(getUsers).post(postUsers)
app.use('/:id',userRouter)


// 14 params middleware 
router.param('id',(req,res,next,val)=>{
  console.log(val)
  next()
  //this param only works jb query hgi ese sbke lie ni chalega ye
})

//15 chaining middlewares

router.route('/:id').get(tourRouter.functionName,getallTours)

exports.functionName=((req,res,next)=>{
  if(req.name=="ss")
  {
    return res.status(400).json({
      message:'wrong id pass',
      data
    })
  }
  next()
})
// 12 middleware for getting req params pt 17
app.use(express.json());

//13 register pt 21 practicing middleware
app.use('app.route', tourRouter);
tourRouter = express.Router();
tourRouter.rote('/').get(getAlLTours).post(postTuroranyothername);

// 14 expresss me chaining middleware practice pt no 24
app.use('tourrote', tourController);
router = express.route();
router.route('approute', tourcomtrooler.functionName);

functionName(req, res, next);
{
  res.status(200).json({
    essage: 'successs',
    data,
  });
}

//15 tourschema pt no 29 on register
const tourSchema = new Mongoose.schema({
  name: { type: String },
  required: [true, 'A Tour must have a name'],
  unique: true,
  trim: true,
  maxlength: [40, 'A Tour sould max have 40 characters'],
  minlength: [10, 'A Tour must have minimum 10 characters'],
});

const Tour = mongoose.model('Tour', tourSchema);

//16 for saving in db pt no 30
const newTour = new Tour({
  name: 'shashwat',
});

newTour.save();

// 17 findbyidand update pt no 35 register
exports.updateTour = catchAsync(async (req, res, next) => {
  
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
});



//18 implementing filtering pt no 36 on register
exports.getAllTours = (req, res) => {
  const queries = { ...req.queries };
  const excludedFields = ['sort', 'page'];
  excludedFields.forEach((item) => delete queries(item));
};

//19 aggregate practice pt 37

exports.tourAggregator = async (req, res) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: null,
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRatings: { $sum: '' },
      },
    },
  ]);
};

//20 virtual properties register pt 39

TourSchema.virtual('propertyName which u want to set').get(function () {
  return this.duration / 7;
});

// let andinschema{
//   toObject:{virtuals:truee}
//   toJson:{virtuals:truee}
// }

//21 document middleware pre and works on pre and post and works on save and create
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
});

tourSchema.post('save', function () {
  this.slug = slugify(this.name, { upper: true });
});

//22 query middleware this one works on find pt no 41 in register
tourSchema.pre('/^find/', function (next) {
  this.find({ secretTours: { $ne: true } });
  this.start = Date.now();
  next();
});
//doc ke detail bhi milte h is wale post iddleware me
tourSchema.post('/^find/', function (next) {
  console.log(`Query took ${Date.now() - this.start} millisecond`);
  next();
});

//23 aggregator pipeline pt no 42 in register
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTours: { $ne: true } } });
  next();
});

//24 custom vakidator pt no 43 on register
priceDiscount: {
  type: Number,
  unique: true,
  validate:{
    validator:function(val)
    {
     // this points to current object only
return val<this.price
    },
    message:'Discount price ust be less than the regular price '
  }
};

//25 unhandled routes pt 44 on register

app.all('*',function(req,res,next)
{
  res.status(404).json({
    message:`can't find the route which u have requested on the server`,
     status:'fail'
  })
})

//26 error middleware pt no 46 on register'

app.use((err,req,res,next)=>{
res.status(404).json({
  message:err.message||'error h bhai',
  status:err.status
})
})

//27 creating genral error handling class pt 46 on register 

class AppError extends Error{
  constructor(statusCode,status)
  {
    super(message)
    this.statusCode=statusCode
    this.status=status

    Error.captureStackTrace(this,this.constructor)
  }
}
module.exports=AppError

// 28 removing try catch register pt 47
module.exports=fn=>{
  return (req,res,next)=>{
    fn(req,res,next).catch(next(err))
  }
} 

// 29 findbyid me id ni mili to eroro uski handling pt no 48 on register 
exports.getTour=catchAsync(async(req,res,next)=>{
  const idTour=await Tour.findById((req.params.id),(err)=>{
    if(err)
    {
      new AppError("no id founf by this kindly sleect the right options")
    }
  })
})


//30 handling unhandled rejection ie server close etc pt no 49 on register
process.on('unhandledrejection',(err)=>{
  server.close(()=>{
    process.exit()
  })
})

//31 gathering ids from array pt 65 on register 

tourSchema.pre('save',async (req,res,next)=>{
  const guidePromises=this.guides.map(async (id)=>await User.findById(id))
  this.guides=await Promise.all(guidePromises)
  next()
})


