# React Setup Instructions

## Installation Steps

1. Install dependencies:
```bash
npm install
```

2. Move images to public folder:
   - Copy all image files (like `1765817188990.jpg`, `photo-1487260211189-670c54da558d.jpeg`, etc.) to the `public/` folder
   - Update image paths in components to use `/image-name.jpg` instead of relative paths

3. Start the development server:
```bash
npm start
```

## File Structure

```
src/
  ├── components/
  │   ├── Header.js
  │   ├── Footer.js
  │   └── SOSModal.js
  ├── pages/
  │   ├── Home.js
  │   ├── Specialist.js
  │   ├── Questions.js
  │   ├── VoiceInput.js
  │   ├── About.js
  │   ├── Appointment.js
  │   ├── Login.js
  │   └── Signup.js
  ├── App.js
  ├── index.js
  ├── index.css
  ├── App.css
  └── [all CSS files copied here]

public/
  ├── index.html
  └── [images should be here]
```

## Notes

- All HTML has been converted to React JSX
- All CSS files are preserved and imported
- JavaScript files (script.js, questions.js, voice-input.js) should be integrated into React components as needed
- React Router is set up for navigation
- Original HTML files are kept for reference but React app uses the new structure
