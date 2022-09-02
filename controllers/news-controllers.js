const NEWS = require('../shared/news');

const getNews = (req, res, next) => {
    res.status(200).json({ news: NEWS });
}

const getNewById = (req, res, next) => {
    const newId = req.params.nid;
    const newSearch = NEWS.filter(newItem => newItem.id == newId);

    if (newSearch.length === 0) {
        res.status(404).json({ message: 'Could not find a new for the provided id.' });
    }
    else res.status(200).json({ new: newSearch[0] });
}

const createNew = (req, res, next) => {
    const { title, description, author, image1, image2 } = req.body;
    const createdNew = {
        id: `n${NEWS.length + 1}`,
        title,
        articles: Array.isArray(description) ? description : [description],
        author,
        image1,
        image2,
        alt: 'alt',
        date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
    NEWS.push(createdNew);
    res.status(200).json({ createdNew });
}

exports.getNews = getNews;
exports.getNewById = getNewById;
exports.createNew = createNew;