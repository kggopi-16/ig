# IGCE College Website

This repository contains the source code for the Indra Ganesan College of Engineering website.

## Project Structure

```
├── index.html              # Homepage
├── about.html             # About page
├── academics.html         # Academic programs
├── admissions.html        # Admissions information
├── contact.html           # Contact information
├── departments.html       # Department listing
├── departments/          
│   ├── cse.html          # Computer Science dept
│   ├── ece.html          # Electronics & Communication dept
│   ├── mech.html         # Mechanical dept
│   └── civil.html        # Civil dept
├── css/
│   ├── common.css        # Shared styles
│   ├── index.css         # Homepage specific styles
│   ├── department.css    # Department page styles
│   └── navigation.css    # Navigation and menu styles
├── js/
│   ├── main.js          # Common JavaScript
│   ├── index.js         # Homepage scripts (slider, announcements)
│   └── contact.js       # Contact form handling
├── img/                  # Image assets
└── sitemap.xml          # Site structure for SEO
```

## CSS Files

- `common.css`: Global styles, typography, colors, utilities
- `index.css`: Homepage-specific styles (hero slider, announcements)
- `department.css`: Styles for department pages
- `navigation.css`: Header, navigation, and dropdown menu styles

## JavaScript Files

- `main.js`: Common functionality (navigation, scroll handling)
- `index.js`: Homepage features:
  - Hero slider with continuous loop
  - Announcement ticker
  - Stats counter animation
- `contact.js`: Contact form validation and submission

## Recent Updates

### October 29, 2025
- Fixed focus outline behavior for better accessibility
- Implemented continuous slider loop
- Simplified announcements controls
- Combined Academics & Departments menus
- Created department pages with consistent styling
- Added department-specific CSS
- Updated sitemap.xml with new structure

## Key Features

1. Responsive Design
   - Mobile-first approach
   - Tailwind CSS framework
   - Custom responsive components

2. Accessibility
   - ARIA labels
   - Keyboard navigation
   - Focus management
   - Skip to content link

3. Performance
   - Optimized images
   - Minimal JavaScript
   - CSS animations
   - Lazy loading

## Development Guidelines

1. CSS
   - Use Tailwind classes for layout
   - Custom CSS for specific components
   - Follow BEM naming convention for custom classes
   - Maintain separation of concerns

2. JavaScript
   - Modular class-based architecture
   - Event delegation for performance
   - Error handling and graceful degradation
   - Comments for complex logic

3. HTML
   - Semantic markup
   - Proper heading hierarchy
   - Descriptive alt text
   - Valid HTML5

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Update documentation
5. Submit pull request