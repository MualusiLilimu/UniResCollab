const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/projectController');
const { ensureAuthenticated, ensureResearcher } = require('../middleware/authMiddleware');

const flash = require('express-flash');

// After session middleware setup
router.use(flash());

// This is the Route to display the project creation form using GET
router.get('/create', ensureAuthenticated, ensureResearcher, (req, res) => {
  res.render('create'); // Make sure this EJS view exists
});

// This is the Route to handle the form submission using POST
router.post('/create', ensureAuthenticated, ensureResearcher, projectController.createProject);

router.get('/project-details/:id', ensureAuthenticated, projectController.viewProjectDetails);


// Show all projects for the logged-in researcher
router.get('/my-projects', ensureAuthenticated, ensureResearcher, projectController.getMyProjects);

// View a single project by ID
router.get('/:id', ensureAuthenticated, ensureResearcher, projectController.viewProjectDetails);

// Create Project
router.post('/create', async (req, res) => {
  try {
    const { 
      title, domain, abstract, 
      startDate, endDate, methodology,
      collaborators, visibility, ethics, dataPolicy 
    } = req.body;

    const project = new Project({
      user: req.user._id,
      title,
      domain,
      abstract,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      methodology: Array.isArray(methodology) ? methodology : [methodology],
      collaborators: collaborators ? collaborators.split(',').map(email => email.trim()) : [],
      visibility,
      ethics,
      dataPolicy
    });

    await project.save();
    
    // Set flash message and redirect
    req.flash('success', 'Research project created successfully!');
    res.redirect('/my-projects');
    
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to create project. Please try again.');
    res.redirect('/researcher/projects/create');
  }
});

// Get User Projects
router.get('/my-projects', async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.render('my-projects', { 
      title: 'My Projects',
      projects,
      messages: {
        success: req.flash('success'),
        error: req.flash('error')
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving projects');
  }
});

//route to project details page 
router.get('/project-details/:id', ensureAuthenticated, (req, res) => {
  res.render('project-details', {
    title: 'Project Details',
  });
});

module.exports = router;
