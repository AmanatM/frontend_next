type QuestionFile = {
  content: string | null
  created_at: string | null
  id: string
  language: string | null
  name: string
  path: string | null
  question_id: string | null
}

type CodingQuestion = {
  created_at: string
  description: string
  difficulty: string | null
  id: string
  solution: string | null
  title: string
  with_browser: boolean
} & {
  coding_question_files: QuestionFile[]
}

export function getCodingQuestionById(id: string) {
  return mock_codingQuestions[0]
}

export const mock_codingQuestions: CodingQuestion[] = [
  {
    id: '1',
    created_at: '',
    description:
      'Expand your web page by adding an image that represents one of your interests. Use the `<img>` tag to include a picture from the internet. Make sure to set the `alt` attribute to describet. Make sure to set the `alt` attribute to describet. Make sure to set the `alt` attribute to describe the image\'s content.\n\n#### Real image link\n\n```html\n<img src="https://unsplash.com/photos/black-flat-screen-computer-monitor-eYpcLDXHVb0"/>\n```\n\n#### Requirements\n\n- Choose an image that is appropriately licensed for use.\n- Remember to use a valid URL for the src attribute.\n- Use the alt attribute to provide a fallback text description of the image.',
    difficulty: null,
    solution: null,
    title: 'Creating a Navigation Bar',
    with_browser: true,
    coding_question_files: [
      {
        id: '235245',
        name: 'index.html',
        path: '/index.html',
        created_at: '',
        language: 'html',
        question_id: '1',
        content: `<!DOCTYPE html>
        <html>
        
        <head>
          <title>Parcel Sandbox</title>
          <meta charset="UTF-8" />
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
        <div id="home">
            <h1>Welcome to My Website</h1>
            <p>This is a simple navigation bar example.</p>
        </div>
        </body>
        </html>
        <!-- Additional sections for About and Contact would go here -->`,
      },
      {
        id: '14512345',
        name: 'style.css',
        path: '/style.css',
        created_at: '',
        language: 'css',
        question_id: '1',
        content: `nav ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: navy;
      }
      
      nav ul li {
          float: left;
      }
      
      nav ul li a {
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
      }
      
      nav ul li a:hover {
          background-color: #111;
      }
      `,
      },
    ],
  },
  {
    id: '2',
    created_at: '',
    description:
      'Expand your web page by adding an image that represents one of your interests. Use the `<img>` tag to include a picture from the internet. Make sure to set the `alt` attribute to describet. Make sure to set the `alt` attribute to describet. Make sure to set the `alt` attribute to describe the image\'s content.\n\n#### Real image link\n\n```html\n<img src="https://unsplash.com/photos/black-flat-screen-computer-monitor-eYpcLDXHVb0"/>\n```\n\n#### Requirements\n\n- Choose an image that is appropriately licensed for use.\n- Remember to use a valid URL for the src attribute.\n- Use the alt attribute to provide a fallback text description of the image.',
    difficulty: null,
    solution: null,
    title: 'Second mock test',
    with_browser: true,
    coding_question_files: [
      {
        id: '235245',
        name: 'index.html',
        path: '/index.html',
        created_at: '',
        language: 'html',
        question_id: '1',
        content: `<!DOCTYPE html>
        <html>
        
        <head>
          <title>Parcel Sandbox</title>
          <meta charset="UTF-8" />
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
        <div id="home">
            <h1>Welcome to My Website</h1>
            <p>This is a simple navigation bar example.</p>
        </div>
        </body>
        </html>
        <!-- Additional sections for About and Contact would go here -->`,
      },
      {
        id: '14512345',
        name: 'style.css',
        path: '/style.css',
        created_at: '',
        language: 'css',
        question_id: '1',
        content: `nav ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: navy;
      }
      
      nav ul li {
          float: left;
      }
      
      nav ul li a {
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
      }
      
      nav ul li a:hover {
          background-color: #111;
      }
      `,
      },
    ],
  },
]
