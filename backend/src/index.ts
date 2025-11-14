// import express from 'express';
// import cors, { CorsOptions } from "cors";
// import dotenv from 'dotenv';

// // Import all routes
// import authRoutes from './api/auth/auth.routes.js';
// import adminRoutes from './api/admin/admin.routes.js';
// import parentRoutes from './api/parent/parent.routes.js';
// import therapistRoutes from './api/therapist/therapist.routes.js';
// import bookingRoutes from './api/booking/booking.routes.js';
// import slotRoutes from './api/slots/slots.routes.js';
// import feedbackRoutes from './api/feedback/feedback.routes.js';
// import demoRoutes from './api/demo/demo.routes.js';
// import prisma from './utils/prisma.js';

// // Load environment variables
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     console.log('[CORS] Request origin:', origin ?? 'none');
//     callback(null, true); // Reflect the request origin (dynamic allow list)
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
//   allowedHeaders: [
//     'Content-Type', 
//     'Authorization', 
//     'X-Requested-With',
//     'Accept',
//     'Origin',
//     'Access-Control-Request-Method',
//     'Access-Control-Request-Headers'
//   ],
//   exposedHeaders: ['Content-Range', 'X-Content-Range'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

// // Apply CORS FIRST - before any other middleware
// app.use(cors(corsOptions));

// // Manually set CORS headers for every response (fallback for proxies/CDN)
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (origin) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD'
//   );
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
//   );

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(204);
//   }

//   next();
// });

// // Parse JSON bodies
// app.use(express.json());

// // Basic request logger (path, method, status) - AFTER CORS
// app.use((req, res, next) => {
//   const started = Date.now();
//   // eslint-disable-next-line no-console
//   console.log('[REQ]', req.method, req.originalUrl, 'Origin:', req.headers.origin || 'none');
//   res.on('finish', () => {
//     const ms = Date.now() - started;
//     // eslint-disable-next-line no-console
//     console.log('[RES]', req.method, req.originalUrl, res.statusCode, ms + 'ms');
//   });
//   next();
// });

// // API Routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/admin', adminRoutes);
// app.use('/api/v1/parents', parentRoutes);
// app.use('/api/v1/therapists', therapistRoutes);
// app.use('/api/v1/bookings', bookingRoutes);
// app.use('/api/v1/slots', slotRoutes);
// app.use('/api/v1/feedback', feedbackRoutes);
// app.use('/api/v1/demo', demoRoutes);

// // Health endpoint for connectivity checks
// app.get('/api/v1/health', (_req, res) => {
//   res.status(200).json({ status: 'ok' });
// });


// const startServer = async () => {
//   try {
//     // Connect to database with retry logic
//     let retries = 5;
//     while (retries > 0) {
//       try {
//         await prisma.$connect();
//         console.log('✓ Connected to database');
//         break;
//       } catch (error: any) {
//         retries--;
//         if (retries === 0) {
//           throw error;
//         }
//         console.warn(`Database connection failed, retrying... (${5 - retries}/5)`);
//         await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
//       }
//     }
    
//     app.listen(PORT, () => {
//       console.log(`✓ Server is running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error('✗ Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();


import express from 'express';
import cors, { CorsOptions } from "cors";
import dotenv from 'dotenv';
dotenv.config();

// Import all routes
import authRoutes from './api/auth/auth.routes.js';
import adminRoutes from './api/admin/admin.routes.js';
import parentRoutes from './api/parent/parent.routes.js';
import therapistRoutes from './api/therapist/therapist.routes.js';
import bookingRoutes from './api/booking/booking.routes.js';
import slotRoutes from './api/slots/slots.routes.js';
import feedbackRoutes from './api/feedback/feedback.routes.js';
import demoRoutes from './api/demo/demo.routes.js';
import therapyNotesRoutes from './api/therapy-notes/therapy-notes.routes.js';
import prisma from './utils/prisma.js';

// Load environment variables
const app = express();
const PORT = process.env.PORT || 5000;

// Define allowed origins
const allowedOrigins = [
  'https://theraabee.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'https://therabee.in',
  'https://app.therabee.in'
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log('[CORS] Request origin:', origin ?? 'none');
    
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('[CORS] Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'X-API-Key'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400, // 24 hours
};

// Apply CORS FIRST - before any other middleware
app.use(cors(corsOptions));

// Handle preflight requests globally
app.options('*', cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Basic request logger (path, method, status) - AFTER CORS
app.use((req, res, next) => {
  const started = Date.now();
  console.log('[REQ]', req.method, req.originalUrl, 'Origin:', req.headers.origin || 'none');
  res.on('finish', () => {
    const ms = Date.now() - started;
    console.log('[RES]', req.method, req.originalUrl, res.statusCode, ms + 'ms');
  });
  next();
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/parents', parentRoutes);
app.use('/api/v1/therapists', therapistRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/slots', slotRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/demo', demoRoutes);
app.use('/api/v1/therapy-notes', therapyNotesRoutes);

// Health endpoint for connectivity checks
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (_req, res) => {
  res.status(200).json({ 
    message: 'TheraBee API Server',
    version: '1.0.0',
    status: 'running'
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

const startServer = async () => {
  try {
    // Connect to database with retry logic
    let retries = 5;
    while (retries > 0) {
      try {
        await prisma.$connect();
        console.log('✓ Connected to database');
        break;
      } catch (error: any) {
        retries--;
        if (retries === 0) {
          throw error;
        }
        console.warn(`Database connection failed, retrying... (${5 - retries}/5)`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
      }
    }
    
    app.listen(PORT, () => {
      console.log(`✓ Server is running on http://localhost:${PORT}`);
      console.log(`✓ CORS enabled for origins: ${allowedOrigins.join(', ')}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();