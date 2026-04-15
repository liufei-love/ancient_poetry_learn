// 诗人数据
export const poets = [
  {
    id: '1',
    name: '李白',
    dynasty: '唐朝',
    description: '唐代伟大的浪漫主义诗人，被后人誉为"诗仙"',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Li%20Bai%20Tang%20Dynasty%20poet%20traditional%20Chinese%20painting%20style&image_size=portrait_4_3',
    audioUrl: '',
    famousLines: ['床前明月光，疑是地上霜', '飞流直下三千尺，疑是银河落九天']
  },
  {
    id: '2',
    name: '杜甫',
    dynasty: '唐朝',
    description: '唐代伟大的现实主义诗人，被后人誉为"诗圣"',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Du%20Fu%20Tang%20Dynasty%20poet%20traditional%20Chinese%20painting%20style&image_size=portrait_4_3',
    audioUrl: '',
    famousLines: ['国破山河在，城春草木深', '安得广厦千万间，大庇天下寒士俱欢颜']
  },
  {
    id: '3',
    name: '白居易',
    dynasty: '唐朝',
    description: '唐代伟大的现实主义诗人，与元稹共同倡导新乐府运动',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Bai%20Juyi%20Tang%20Dynasty%20poet%20traditional%20Chinese%20painting%20style&image_size=portrait_4_3',
    audioUrl: '',
    famousLines: ['离离原上草，一岁一枯荣', '江南好，风景旧曾谙']
  },
  {
    id: '4',
    name: '苏轼',
    dynasty: '宋朝',
    description: '北宋著名文学家、书画家，唐宋八大家之一',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Su%20Shi%20Song%20Dynasty%20poet%20traditional%20Chinese%20painting%20style&image_size=portrait_4_3',
    audioUrl: '',
    famousLines: ['大江东去，浪淘尽，千古风流人物', '但愿人长久，千里共婵娟']
  },
  {
    id: '5',
    name: '李清照',
    dynasty: '宋朝',
    description: '南宋著名女词人，婉约派代表人物',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Li%20Qingzhao%20Song%20Dynasty%20poetess%20traditional%20Chinese%20painting%20style&image_size=portrait_4_3',
    audioUrl: '',
    famousLines: ['寻寻觅觅，冷冷清清，凄凄惨惨戚戚', '莫道不销魂，帘卷西风，人比黄花瘦']
  }
];

// 诗词数据
export const poems = [
  {
    id: '1',
    title: '静夜思',
    content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
    poetId: '1',
    dynasty: '唐朝',
    sentences: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。'],
    characters: ['床', '前', '明', '月', '光', '，', '疑', '是', '地', '上', '霜', '。', '举', '头', '望', '明', '月', '，', '低', '头', '思', '故', '乡', '。']
  },
  {
    id: '2',
    title: '望庐山瀑布',
    content: '日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。',
    poetId: '1',
    dynasty: '唐朝',
    sentences: ['日照香炉生紫烟，', '遥看瀑布挂前川。', '飞流直下三千尺，', '疑是银河落九天。'],
    characters: ['日', '照', '香', '炉', '生', '紫', '烟', '，', '遥', '看', '瀑', '布', '挂', '前', '川', '。', '飞', '流', '直', '下', '三', '千', '尺', '，', '疑', '是', '银', '河', '落', '九', '天', '。']
  },
  {
    id: '3',
    title: '春望',
    content: '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。烽火连三月，家书抵万金。白头搔更短，浑欲不胜簪。',
    poetId: '2',
    dynasty: '唐朝',
    sentences: ['国破山河在，', '城春草木深。', '感时花溅泪，', '恨别鸟惊心。', '烽火连三月，', '家书抵万金。', '白头搔更短，', '浑欲不胜簪。'],
    characters: ['国', '破', '山', '河', '在', '，', '城', '春', '草', '木', '深', '。', '感', '时', '花', '溅', '泪', '，', '恨', '别', '鸟', '惊', '心', '。', '烽', '火', '连', '三', '月', '，', '家', '书', '抵', '万', '金', '。', '白', '头', '搔', '更', '短', '，', '浑', '欲', '不', '胜', '簪', '。']
  },
  {
    id: '4',
    title: '赋得古原草送别',
    content: '离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。远芳侵古道，晴翠接荒城。又送王孙去，萋萋满别情。',
    poetId: '3',
    dynasty: '唐朝',
    sentences: ['离离原上草，', '一岁一枯荣。', '野火烧不尽，', '春风吹又生。', '远芳侵古道，', '晴翠接荒城。', '又送王孙去，', '萋萋满别情。'],
    characters: ['离', '离', '原', '上', '草', '，', '一', '岁', '一', '枯', '荣', '。', '野', '火', '烧', '不', '尽', '，', '春', '风', '吹', '又', '生', '。', '远', '芳', '侵', '古', '道', '，', '晴', '翠', '接', '荒', '城', '。', '又', '送', '王', '孙', '去', '，', '萋', '萋', '满', '别', '情', '。']
  },
  {
    id: '5',
    title: '水调歌头·明月几时有',
    content: '明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。',
    poetId: '4',
    dynasty: '宋朝',
    sentences: ['明月几时有？', '把酒问青天。', '不知天上宫阙，', '今夕是何年。', '我欲乘风归去，', '又恐琼楼玉宇，', '高处不胜寒。', '起舞弄清影，', '何似在人间。', '转朱阁，', '低绮户，', '照无眠。', '不应有恨，', '何事长向别时圆？', '人有悲欢离合，', '月有阴晴圆缺，', '此事古难全。', '但愿人长久，', '千里共婵娟。'],
    characters: ['明', '月', '几', '时', '有', '？', '把', '酒', '问', '青', '天', '。', '不', '知', '天', '上', '宫', '阙', '，', '今', '夕', '是', '何', '年', '。', '我', '欲', '乘', '风', '归', '去', '，', '又', '恐', '琼', '楼', '玉', '宇', '，', '高', '处', '不', '胜', '寒', '。', '起', '舞', '弄', '清', '影', '，', '何', '似', '在', '人', '间', '。', '转', '朱', '阁', '，', '低', '绮', '户', '，', '照', '无', '眠', '。', '不', '应', '有', '恨', '，', '何', '事', '长', '向', '别', '时', '圆', '？', '人', '有', '悲', '欢', '离', '合', '，', '月', '有', '阴', '晴', '圆', '缺', '，', '此', '事', '古', '难', '全', '。', '但', '愿', '人', '长', '久', '，', '千', '里', '共', '婵', '娟', '。']
  }
];

// 根据诗人ID获取诗词
export const getPoemsByPoetId = (poetId: string) => {
  return poems.filter(poem => poem.poetId === poetId);
};

// 根据诗词ID获取诗词
export const getPoemById = (poemId: string) => {
  return poems.find(poem => poem.id === poemId);
};

// 根据诗人ID获取诗人
export const getPoetById = (poetId: string) => {
  return poets.find(poet => poet.id === poetId);
};