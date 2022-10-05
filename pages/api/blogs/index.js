export default function handler(req, res) {
  res.status(200).json([
    {
      id: 1,
      title: '11 Life Skills I’ve Learned from Blogging',
      body: " 'You can learn something every day if you pay attention.' – Ray LeBlond  Believe it or not, becoming a blogger was never something I planned. In fact, when I tell the story, I always mention Becoming Minimalist was originally started as just an online journal for our decluttering and minimizing journey.   But somewhere along the way, I began to notice the positive effect it was having on my life and others. Not only was this website becoming an inspiration to thousands (eventually millions) around the world, it was beginning to change me in positive ways I had not expected. Sure, it served its purpose of an online journal, but far more than that, the discipline of blogging was forcing me to learn new life skills – life skills that are highly transferable to other endeavors.",
      comment: [
        { id: 1, by: 'anonymous', comment: 'very nice content' },
        {
          id: 2,
          by: 'eyob',
          comment:
            'I cannot thank you enough for your understanding and support through some difficult times. It is refreshing to work with someone who provides the utmost in professionalism and kindness.',
        },
        {
          id: 3,
          by: 'amanuel',
          comment:
            'Team of professionals have helped us to improve many aspects of our life, social life included. The personal assistant works hard, we do not need to follow her around, she knows what to do.',
        },
      ],
      blogMeta: {
        author: 'Ray LeBlond',
        seen: 15,
        upVote: 44,
        downVote: 5,
        date: '15-022015',
        comment: 2,
      },
    },
    {
      id: 2,
      title: 'How i learned to learn',
      body: "‘Learning to learn’ is the ability to pursue and persist in learning, to organise one's own learning, including through effective management of time and information, both individually and in groups. This competence includes awareness of one's learning process and needs, identifying available opportunities, and the ability to overcome obstacles in order to learn successfully. This competence means gaining, processing and assimilating new knowledge and skills as well as seeking and making use of guidance. Learning to learn engages learners to build on prior learning and life experiences in order to use and apply knowledge and skills in a variety of contexts: at home, at work, in education and training. Motivation and confidence are crucial to an individual's competence. Essential knowledge, skills and attitudes related to this competence: Where learning is directed towards particular work or career goals, an individual should have knowledge of the competences, knowledge, skills and qualifications required. In all cases, learning to learn requires an individual to know and understand his/her preferred learning strategies, the strengths and weaknesses of his/her skills and qualifications, and to be able to search for the education and training opportunities and guidance and/or support available. Learning to learn skills require firstly the acquisition of the fundamental basic skills such as literacy, numeracy and ICT skills that are necessary for further learning. Building on these skills, an individual should be able to access, gain, process and assimilate new knowledge and skills. This requires effective management of one's learning, career and  work patterns, and, in particular, the ability to persevere with learning, to concentrate for extended periods and to reflect critically on the purposes and aims of learning. Individuals should be able to dedicate time to learning autonomously and with self-discipline, but also to work collaboratively as part of the learning process, draw the benefits from a heterogeneous group, and to share what they have learnt. Individuals should be able to organise their own learning, evaluate their own work, and to seek advice, information and support when appropriate. A positive attitude includes the motivation and confidence to pursue and succeed at learning throughout one's life. A problem-solving attitude supports both the learning process itself and an individual's ability to handle obstacles and change. The desire to apply prior learning and life experiences and the curiosity to look for opportunities to learn and apply learning in a variety of life contexts are essential elements of a positive attitude.",
      comment: [
        { id: 1, by: 'anonymous', comment: 'very nice content' },
        {
          id: 2,
          by: 'eyob',
          comment:
            'I cannot thank you enough for your understanding and support through some difficult times. It is refreshing to work with someone who provides the utmost in professionalism and kindness.',
        },
        {
          id: 3,
          by: 'amanuel',
          comment:
            'Team of professionals have helped us to improve many aspects of our life, social life included. The personal assistant works hard, we do not need to follow her around, she knows what to do.',
        },
      ],
      blogMeta: {
        author: 'Ray LeBlond',
        seen: 20,
        upVote: 12,
        downVote: 5,
        date: '15-022015',
        comment: 4,
      },
    },
  ]);
}
