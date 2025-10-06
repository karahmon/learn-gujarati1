# Learn Gujarati Admin Dashboard

A comprehensive admin dashboard for managing the Learn Gujarati program, including mentor management, student tracking, and batch coordination.

## 🚀 Features

- **Mentor Management**: Complete CRUD operations for mentors with advanced filtering
- **Student Dashboard**: Overview statistics and analytics
- **Batch Management**: Track and organize learning batches (LG Batch 77, 78, 79, etc.)
- **Search & Filter**: Advanced search across all entities with real-time results
- **CSV Import/Export**: Bulk data operations with downloadable templates
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/UI Components
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/learn-gujarati.git
cd learn-gujarati/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

## 🚀 Deployment

### Vercel Deployment

This project is optimized for Vercel deployment with the included `vercel.json` configuration.

1. **Connect to Vercel**:
   - Fork this repository
   - Connect your GitHub account to Vercel
   - Import the project from the `/frontend` directory

2. **Environment Variables** (if needed):
   - No external APIs required currently
   - All data is managed locally with test data

3. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Root Directory**: `frontend` (if deploying from monorepo)

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

## 📖 Usage

### Default Login Credentials
- **Email**: `learngujarati@dadabhagwan.org`
- **Password**: `Dada@123`

### Key Features

1. **Dashboard**: Overview statistics and quick navigation
2. **Mentors**: 
   - View all mentors with pagination
   - Search by name, email, MHT ID, or mentee details
   - Filter by center, active mentee status, current batch, last batch, seva date
   - Add, edit, delete mentors
   - Export/import CSV data
3. **Coming Soon Pages**: Placeholders for Students, Alumni, Tutors, and Batches

### Mentor Data Structure
- Mentor Name & Email
- Center Assignment
- MHT ID (Unique Identifier)
- Active Mentee Status
- Current Mentee Details
- Batch Information (LG Batch format)
- Active Since & Last Seva Dates

## 🔧 Configuration

### Vercel Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Build Optimization
- Code splitting for React, Router, and UI libraries
- Disabled sourcemaps for production
- Optimized bundle sizes with manual chunks

## 🧪 Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Project Structure
```
src/
├── components/          # Reusable components
├── data/               # Test data and types
├── layout/             # Layout components
├── lib/                # Utility functions and UI components
├── pages/              # Page components
├── router.tsx          # Route configuration
└── main.tsx           # App entry point
```

## 📝 License

This project is part of the Learn Gujarati initiative by Dadabhagwan.org

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please contact the Learn Gujarati development team.

---

Built with ❤️ for the Learn Gujarati community
