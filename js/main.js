const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Сегодня лучший день!',
  'Впереди только лучшие воспоминания!',
  'Поймал момент',
  'Настоящие приключения начинаются здесь',
  'Суббота в разгаре',
  'Солнце, улыбка и немного магии)'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateCommentsId = createRandomIdFromRangeGenerator(1, 1000);
const generateCommentsData = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generatePhotosId = createRandomIdFromRangeGenerator(1, 25);
const generateUrlNumber = createRandomIdFromRangeGenerator(1, 25);
const generatePhotosData = () => ({
  id: generatePhotosId(),
  url: `photos/${ generateUrlNumber() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, generateCommentsData),
});

const PHOTOS_NEEDED = 25;

// Нужно ли писать следующую строку, чтобы тесты в гитхфб прохоидили, или следует делать как-то по-другому?
// eslint-disable-next-line no-unused-vars
const photosData = Array.from({length: PHOTOS_NEEDED}, generatePhotosData);
