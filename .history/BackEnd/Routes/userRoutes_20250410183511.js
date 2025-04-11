const express = require('express');
const router = express.Router(); // typo fixed: route → router

router.post('/', (req, res) => { // typo fixed: '=' → '=>'
    res.send("You have created a user");
});

module.exports = router;


module.exports=router