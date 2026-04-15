# AI-Powered Adaptive Learning System - Frontend

A modern React frontend for an AI-powered adaptive learning platform with real-time difficulty adjustment, personalized learning paths, and comprehensive teacher dashboards.

## Features

### Student Dashboard
- **Learning Path Visualization**: Visual roadmap showing completed, current, and upcoming topics
- **Real-time Difficulty Adjustment Indicator**: Dynamic difficulty display that updates based on student performance
- **Explainability Panel**: "Why am I learning this?" feature explaining personalized topic recommendations
- **Progress Tracking**: Overview of mastery level, topics completed, assessments taken
- **Progress Prediction**: Estimated completion date based on current learning pace
- **Learning Tips & Guidance**: Context-aware recommendations to optimize learning

### Teacher Dashboard
- **Student Overview**: Quick stats on total, active, and inactive students
- **Individual Student Management**: 
  - View each student's current topic and progress
  - Monitor mastery levels
  - Identify weak areas
  - Override recommendations if needed
- **Cohort Analysis View**:
  - Distribution of students across topics
  - Average mastery tracking
  - Performance segment analysis (High/Medium/Low achievers)
  - Visual comparison of student progress

### Technical Stack
- **Frontend Framework**: React 19.2.4
- **Styling**: Tailwind CSS 3.3.6
- **Build Tool**: Vite 8.0.4
- **Routing**: React Router DOM 6.20.0
- **Charts & Visualizations**: Recharts 2.10.3
- **State Management**: React Context API
- **HTTP Client**: Axios 1.6.2

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header.jsx              # Navigation header with role switching
│   │   ├── StudentDashboard.jsx    # Main student view
│   │   ├── LearningPathView.jsx    # Learning path visualization
│   │   ├── DifficultyIndicator.jsx # Real-time difficulty display
│   │   ├── ExplainabilityPanel.jsx # "Why am I learning this?" panel
│   │   ├── ProgressPrediction.jsx  # Completion date prediction
│   │   ├── TeacherDashboard.jsx    # Teacher overview & student list
│   │   └── CohortView.jsx          # Cohort analytics
│   ├── context/
│   │   └── LearningContext.jsx     # Global state management
│   ├── api.js                       # API client configuration
│   ├── App.jsx                      # Main app component
│   ├── index.css                    # Tailwind CSS setup
│   └── main.jsx                     # React entry point
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.js            # Vite build configuration
└── package.json              # Dependencies & scripts
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Backend API running on `http://localhost:8000`

### Installation

```bash
cd frontend/frontend
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. The app automatically reloads on file changes.

### Build for Production

```bash
npm run build
```

Output files are generated in the `dist/` directory.

### Linting

```bash
npm run lint
```

## Component Overview

### LearningPathView
Displays the student's personalized learning roadmap with:
- Visual status indicators (✓ completed, ● current, ○ upcoming)
- Progress bar showing overall completion
- Topic-by-topic progress tracking
- Color-coded status badges

**Props:**
- `learningPath`: Array of topic names
- `currentTopic`: Currently active topic
- `completedTopics`: Array of completed topic names

### DifficultyIndicator
Real-time visual indicator of current learning difficulty:
- Color-coded difficulty levels (Easy, Medium, Hard)
- Progress bar animation
- Auto-adjusts based on student performance

### ExplainabilityPanel
Collapsible panel explaining why each topic is recommended:
- Lists multiple personalization reasons
- Shows skill area improvements
- Expandable design for clean UI

### ProgressPrediction
Projects learning completion date:
- Calculates remaining topics vs learning pace
- Displays projected completion date
- Shows daily topic completion trend chart
- Estimates days to completion

### StudentDashboard
Main student view combining all student-facing features:
- Quick stats cards
- Current focus display
- Full learning path
- Recommendation explanation
- Progress prediction
- Learning tips

### TeacherDashboard
Comprehensive teacher view with:
- Summary statistics (total, active, inactive students)
- Interactive student table with mastery visualization
- Quick action buttons for path adjustments
- Student status and weak area identification

### CohortView
Analytics dashboard showing:
- Average cohort mastery
- Student distribution across topics
- Performance segmentation
- Individual mastery comparison

## API Integration

The frontend communicates with a FastAPI backend:

### Endpoints
- `GET /student/{student_id}` - Student dashboard data
- `GET /teacher/dashboard` - Teacher dashboard data

### Response Formats

**StudentDashboardResponse**
```json
{
  "student_name": "string",
  "mastery": 0.75,
  "current_topic": "string",
  "completed_topics": 3,
  "assessments_taken": 5,
  "strong_area": "string",
  "weak_area": "string",
  "learning_path": ["Topic 1", "Topic 2", ...],
  "recommendation": { "reasons": [...] }
}
```

**TeacherDashboardResponse**
```json
{
  "total_students": 30,
  "active_students": 25,
  "inactive_students": 5,
  "students": [
    {
      "id": 1,
      "name": "string",
      "current_topic": "string",
      "mastery": 0.75,
      "weak_area": "string",
      "is_logged_in": true,
      "is_active": true
    }
  ]
}
```

## State Management

The `LearningContext` provides global state:
- `studentData`: Current student information
- `teacherData`: Teacher dashboard information
- `userRole`: 'student' or 'teacher'
- `loading`: Loading state
- `error`: Error messages
- `fetchStudentDashboard(studentId)`: Fetch student data
- `fetchTeacherDashboard()`: Fetch teacher data
- `switchRole(role)`: Switch between student/teacher views

## Styling Notes

- Tailwind CSS provides all utility classes
- Custom color scheme defined in `tailwind.config.js`
- Primary color: Sky blue (`#0ea5e9`)
- Success: Green, Warning: Amber, Danger: Red
- Responsive design: Mobile-first approach with breakpoints at 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting via Vite
- Lazy component loading
- Memoized context to prevent unnecessary re-renders
- Optimized chart rendering with Recharts

## Environment Configuration

API base URL is configured in `src/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```

For production, update this URL in your deployment environment.

## Developer Tips

1. **Role Switching**: Use the header buttons to toggle between student/teacher views
2. **Real-time Updates**: The context provides automatic data fetching
3. **Chart Responsiveness**: Recharts components automatically resize with container
4. **Tailwind IntelliSense**: Install Tailwind CSS IntelliSense extension in your IDE

## Future Enhancements

- Real-time WebSocket updates for live progress tracking
- Assessment and quiz integration
- Dark mode support
- Mobile app (React Native)
- Analytics and reporting dashboard
- Student-teacher messaging system
- Custom learning goal setting

## License

MIT

## Support

For issues or feedback, please check the main project repository or contact the development team.
