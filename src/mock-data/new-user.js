module.exports = {
  title: 'Registration',
  questions: [
    {
      question_id: '1',
      question: 'First name',
      required: true,
      type: 'text',
    },
    {
      question_id: '2',
      question: 'Last name',
      required: true,
      type: 'text',
    },
    {
      question_id: '3',
      question: 'Email address',
      required: true,
      type: 'email',
    },
    {
      question_id: '4',
      question: 'Phone number',
      required: true,
      type: 'tel',
    },
    {
      question_id: '5',
      question: 'Current marital status',
      required: true,
      options: ['Married without divorce pending', 'Married with divorce pending', 'Divorced'],
      type: 'select',
    },
    {
      question_id: '6',
      question: 'Current case status',
      required: true,
      options: ['Open', 'Open but pending close', 'closed'],
      type: 'select',
    },
    {
      question_id: '7',
      question: 'Presiding judge',
      required: true,
      type: 'text',
    },
    {
      question_id: '8',
      question: 'Attorney name',
      required: true,
      type: 'text',
    },
  ]
}
