import { defineConfig } from 'vitepress'
import mathjax3 from "markdown-it-mathjax3";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DogWY's Document",
  description: "This is just for fun.",
  markdown: {
    config: (md) =>{
      md.use(mathjax3);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'PHD', link: '/phd/' },
      { text: '工程师', link: '/developer/' },
      { text: '奇技淫巧', link: '/skill/'},
      { text: '二次元', link: '/anime/'},
      { text: '友链', link: '/friends'}
    ],
    sidebar: {
      '/developer/':[
        {
          text: 'Git',
          items: [
            {text:'Git快速上手', link:'/developer/git/快速上手'}
          ]
        },
        {
          text:'Fastapi',
          items: [
            { text: '前置知识', link: '/developer/fastapi/前置知识'},
            { text: '基础', link: '/developer/fastapi/基础' }
          ]
        },
        {
          text: 'Nginx',
          items: [
            { text: '介绍', link: '/developer/nginx/介绍'}
          ]
        }
      ],
      '/phd/':[
        {
          text: 'PyTorch',
          items: [
            { text: 'view与reshape的比较和分析' , link: '/phd/pytorch/view与reshape的比较和分析'}
          ]
        },
        {
          text: '机器学习',
          items: [
            { text: '线性模型', link: '/phd/机器学习/线性模型'},
            { text: 'Logistic回归', link: '/phd/机器学习/Logistic回归'},
          ]
        },
      ],
      '/skill':[
        {
          text: 'Scrapy爬虫',
          items: [
            {text: '第一步', link: '/skill/scrapy/第一步'},
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DogWY' },
      { icon:{
        svg: '<svg t="1713878915915" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1652" width="200" height="200"><path d="M944 146.5H80c-44.183 0-80 35.817-80 80v590c0 44.184 35.817 80 80 80h864c44.183 0 80-35.816 80-80v-590c0-44.183-35.817-80-80-80z m-864 50h864c16.542 0 30 13.458 30 30v60.605L512 539.324 50 287.104V226.5c0-16.542 13.458-30 30-30z m864 650H80c-16.542 0-30-13.458-30-30V344.07l449.958 245.646a24.896 24.896 0 0 0 12.049 3.059c4.074 0.013 8.208-0.97 12.036-3.06L974 344.07V816.5c0 16.542-13.458 30-30 30z" fill="#999999" p-id="1653"></path></svg>'
      } , link: 'mailto:dogwangyan@163.com'}
    ]
  }
})
