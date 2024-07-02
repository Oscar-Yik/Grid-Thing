"use strict";
// routes/api/themes.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Load Theme model
// const Theme = require('../../models/Theme');
const Theme_1 = __importDefault(require("../../models/Theme"));
// @route   GET api/themes/test
// @desc    Tests themes route
// @access  Public
router.get('/test', (req, res) => res.send('Themes route testing!'));
// @route   GET api/themes
// @desc    Get all Themes
// @access  Public
router.get('/', (req, res) => {
    Theme_1.default.find({})
        .select('-_id -__v')
        .then(Themes => res.json(Themes))
        .catch(err => res.status(404).json({ noThemesfound: 'No Themes found' }));
});
// @route   GET api/themes/:i
// @desc    Get Theme with name "i"
// @access  Public
router.get('/:i', (req, res) => {
    Theme_1.default.find({ name: req.params.i })
        .select('-_id -__v')
        .then(Theme => res.json(Theme[0]))
        .catch(err => res.status(404).json({ noThemefound: 'No such theme found' }));
});
// @route   POST api/themes
// @desc    Add/save Theme
// @access  Public
router.post('/', (req, res) => {
    Theme_1.default.create(req.body)
        .then(Theme => res.json({ msg: 'Theme added successfully', Theme: Theme }))
        .catch(err => res.status(400).json({ error: 'Unable to add this Theme' }));
});
// @route   PUT api/themes/:i
// @desc    Update Theme by i
// @access  Public
router.put('/:i', (req, res) => {
    //Block.findByIdAndUpdate(req.params.i, req.body)
    Theme_1.default.findOneAndUpdate({ name: req.params.i }, req.body, { new: true })
        .then(Theme => {
        if (!Theme) {
            return res.status(404).json({ error: "Theme not found" });
        }
        res.json({ msg: 'Updated successfully', theme: Theme });
    })
        .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});
// @route   DELETE api/themes/:i
// @desc    Delete Theme by i
// @access  Public
router.delete('/:i', (req, res) => {
    //Block.findByIdAndDelete(req.params.i)
    Theme_1.default.findOneAndDelete({ name: req.params.i })
        .then(Theme => res.json({ mgs: 'Theme entry deleted successfully', name: req.params.i }))
        .catch(err => res.status(404).json({ error: 'No such a Theme' }));
});
exports.default = router;
