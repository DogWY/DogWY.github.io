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
    search: {
      provider: 'local'
    },
    lastUpdated:{
      text: '最后更新于',
      formatOptions:{
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    outline: {
      level: 'deep',
      label: '大纲'
    },
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
            { text: 'view与reshape的比较和分析' , link: '/phd/pytorch/view与reshape的比较和分析' },
            { text: 'optim模块速览', link: '/phd/pytorch/optim',},
            { text: 'init模块速览', link: '/phd/pytorch/init',},
          ]
        },
        {
          text: '机器学习',
          items: [
            { text: '线性模型', link: '/phd/机器学习/线性模型'},
            { text: 'Logistic回归', link: '/phd/机器学习/Logistic回归'},
            { text: '初始化方法',
              items: [
                { text: '基础知识', link: '/phd/机器学习/初始化/基础知识'},
                { text: '增益值', link: '/phd/机器学习/初始化/增益值'},
              ]
            },
          ]
        },
        {
          text: '前沿丹方',
          link: '/phd/前沿丹方/index',
          items:[
            
          ]
        },
        {
          text: '语义通信',
          items:[
            { text: '搞sc的人', link: '/phd/语义通信/搞sc的人'}
          ]
        },
        {
          text: 'WiFi Sensing',
          items:[
            {text: '概述', link: '/phd/WiFi Sensing/概述'},
            {text: '论文速读', link: '/phd/WiFi Sensing/论文速读'},
          ]
        },
        {
          text:'杂七杂八',
          items: [
            {text: 'Imuplse Function', link: '/phd/杂七杂八/Impulse Function'},
            {text: 'Dirac delta function', link: '/phd/杂七杂八/Dirac Delta Funtion'},
            {text: 'Mutual Information', link: '/phd/杂七杂八/Mutual Information'},
          ]
        },
        {
          text: '无线通信基础',
          link: '/phd/无线通信/index',
          items:[
            {text: '1. 无线通信概论', link:'/phd/无线通信/1.无线通信概论'},
            {text: '2. 无线电传播机制', link:'/phd/无线通信/2.无线电传播机制'},
            {text: '3. 窄带无线信道', link:'/phd/无线通信/3.窄带无线信道'},
            {text: '4. 宽带和方向性信道', link:'/phd/无线通信/4.宽带和方向性信道'},
            {text: '5. 数字调制解调', link:'/phd/无线通信/5.数字调制解调'},
            {text: '6. 信道编码', link:'/phd/无线通信/6.信道编码'},
            {text: '7. 均衡', link:'/phd/无线通信/7.均衡'},
            {text: '8. 分集', link:'/phd/无线通信/8.分集'},
            {text: '9. 扩展频谱通信', link:'/phd/无线通信/9.扩频频谱通信'},
            {text: '10. 正交频分复用', link:'/phd/无线通信/10.正交频分复用'},
            {text: '11. 多天线技术', link:'/phd/无线通信/11.多天线技术'},
          ]
        },
      ],
      '/skill/':[
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
