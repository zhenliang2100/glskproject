import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  ChevronLeft, 
  MoreHorizontal, 
  Lightbulb,
  Megaphone, 
  Quote, 
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft as ChevronLeftIcon,
  MessageSquareWarning,
  Target,
  Clock,
  Lock,
  CheckCircle2,
  PlayCircle,
  Bot,
  X,
  Send,
  AlertCircle,
  Clapperboard,
  ArrowRight,
  UserCircle,
  CalendarDays,
  Network,
  Phone,
  Car,
  FileText,
  ListChecks
} from 'lucide-react';

// -----------------------------------------------------------------------------
// 1. 模拟课程数据 (包含多个具有共性缺口的战败客户)
// -----------------------------------------------------------------------------
const mockCourseData = {
  courseId: "course_001",
  reviewDate: "2025年10月11日",
  radarData: [
    { subject: '开场破冰', score: 80 },
    { subject: '需求分析', score: 40 }, // 弱项
    { subject: '场景塑造', score: 50 },
    { subject: '产品推荐', score: 70 },
    { subject: '异议处理', score: 30 }, // 极弱项
    { subject: '合规促单', score: 45 }
  ],
  customers: [
    {
      id: "r7_001",
      name: "黄平",
      carModel: "LUXEED 智界R7",
      status: "pending", // 待复盘
      score: 42,
      summary: "因材质（脂肪族 TPU）和定金抵扣策略未讲透，导致比价战败。",
      knowledgeCardsByTab: {
        0: [], 
        1: [{ 
          id: "card_1_1",
          scenario: "黄平今天特意来店里看智界R7，你向他推介了原厂隐形车衣。但他看了一眼报价单，眉头皱了起来...",
          trigger: "外面我也交了500定金了，路边店三千多的车衣也是TPU的，没必要在你们这贴。",
          salesQuote: "黄总，外面那种便宜的膜质量不行的，我们这是原厂大品牌，肯定比他们好。",
          analysis: "未深挖客户比价背后的核心顾虑，面对交定金的比价客户，直接反驳容易引起逆反心理。",
          strategy: "统一战线战术：理解省钱心态 -> 抛出副厂对标 -> 强调伤漆痛点转移定金。",
          script: "“黄总，非常理解您想省钱的心态，外面三千多确实诱人，咱们店里也有这个价位的平价膜。但您买智界R7这么好的车，最怕就是贴劣质膜伤了原厂漆。您那500定金，我们可以通过送一套高品质脚垫帮您抵扣掉...”",
          hasVisual: false
        }],
        2: [], 
        3: [{ 
          id: "card_1_2",
          scenario: "经过定金抵扣引导，黄平态度有些缓和，但他依然对价格差异耿耿于怀，发出了灵魂考验...",
          trigger: "就算你给我把定金抵了，别人家的也是TPU，你们这卖七八千，到底贵在哪了？",
          salesQuote: "贵肯定有贵的道理啊，我们贴了有保障，外面那些坏了都没人管你的。",
          analysis: "材质壁垒未打透，客户无法区分劣质芳香族TPU和优质脂肪族TPU的根本差别。",
          strategy: "降维打击：不要干瘪地讲参数，用直观的“发黄对比图”进行材质隔离。",
          script: "“外面三千多的大多是‘芳香族TPU’甚至TPH，分子间隙大，鸟粪粉尘一渗进去一晒马上发黄。咱们用的进阶‘第四代脂肪族TPU’，分子密度高，真正做到不泛黄！您可以看下这张实测对比图。”",
          hasVisual: true,
          visualData: {
            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='300' viewBox='0 0 800 300'%3E%3Crect width='800' height='300' fill='%231e293b'/%3E%3Ctext x='400' y='60' font-family='sans-serif' font-size='28' font-weight='bold' fill='white' text-anchor='middle'%3E脂肪族 TPU vs 芳香族 TPU 分子发黄对比%3C/text%3E%3Crect x='100' y='90' width='250' height='160' rx='16' fill='%23334155'/%3E%3Ctext x='225' y='130' font-family='sans-serif' font-size='20' font-weight='bold' fill='%234ade80' text-anchor='middle'%3E脂肪族 (优质)%3C/text%3E%3Ccircle cx='225' cy='200' r='40' fill='%2310b981' opacity='0.8'/%3E%3Ctext x='225' y='270' font-family='sans-serif' font-size='16' fill='%2394a3b8' text-anchor='middle'%3E密度高 / 不易黄变%3C/text%3E%3Crect x='450' y='90' width='250' height='160' rx='16' fill='%23334155'/%3E%3Ctext x='575' y='130' font-family='sans-serif' font-size='20' font-weight='bold' fill='%23f87171' text-anchor='middle'%3E芳香族 (低劣)%3C/text%3E%3Ccircle cx='575' cy='200' r='40' fill='%23b45309' opacity='0.8'/%3E%3Ctext x='575' y='270' font-family='sans-serif' font-size='16' fill='%2394a3b8' text-anchor='middle'%3E易渗透 / 极易发黄%3C/text%3E%3C/svg%3E",
          }
        }],
        4: [],
        5: []
      }
    },
    {
      id: "m9_002",
      name: "陈女士",
      carModel: "AITO 问界M9",
      status: "pending", // 待复盘
      score: 55,
      summary: "面对客户的竞品防晒膜对比，未能建立有效的参数护城河。",
      knowledgeCardsByTab: {
        0: [], 
        1: [], 
        2: [{ 
          id: "card_2_1",
          scenario: "陈女士在看问界M9，她表示自己对防晒要求极高，听说某竞品品牌的防晒膜能做到100%防紫外线。",
          trigger: "人家那个牌子的膜说是能防100%的紫外线，你们原厂的这个能行吗？",
          salesQuote: "怎么可能100%防晒，那都是夸张的说法，我们原厂的膜隔热肯定够用的。",
          analysis: "未利用官方背书建立信任，面对竞品参数显得底气不足。",
          strategy: "官方背书 + 场景植入：利用原厂定制匹配度打压后市场通用产品。",
          script: "“陈女士您放心，咱们原厂的防晒膜是专门为M9的大面积玻璃定制的，紫外线阻隔率实测达到99.9%以上，完全不输外面大牌。而且原厂膜最重要的是不挡ETC和手机信号，外面的厚膜贴上后，过收费站经常扫不出。”",
          hasVisual: false
        }], 
        3: [], 
        4: [],
        5: []
      }
    }
  ]
};

// -----------------------------------------------------------------------------
// 2. 自定义简易 SVG 雷达图组件
// -----------------------------------------------------------------------------
const RadarChart = ({ data }) => {
  const size = 200; // 稍微缩小一点，给列表留空间
  const center = size / 2;
  const radius = size / 2 - 30;
  const maxValue = 100;

  const points = data.map((d, i) => {
    const angle = (Math.PI / 2) - (2 * Math.PI * i / data.length);
    return {
      x: center + radius * Math.cos(angle),
      y: center - radius * Math.sin(angle),
      valX: center + (radius * (d.score / maxValue)) * Math.cos(angle),
      valY: center - (radius * (d.score / maxValue)) * Math.sin(angle),
      label: d.subject
    };
  });

  const polygonPath = points.map(p => `${p.valX},${p.valY}`).join(' ');
  const bgPolygons = [1, 0.75, 0.5, 0.25].map(scale => {
    return points.map(p => {
      const angle = Math.atan2(center - p.y, p.x - center);
      const px = center + radius * scale * Math.cos(angle);
      const py = center - radius * scale * Math.sin(angle);
      return `${px},${py}`;
    }).join(' ');
  });

  return (
    <div className="flex justify-center items-center relative py-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {bgPolygons.map((points, idx) => (
          <polygon key={idx} points={points} fill="none" stroke="#e2e8f0" strokeWidth="1" />
        ))}
        {points.map((p, i) => (
          <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1" />
        ))}
        <polygon points={polygonPath} fill="rgba(37, 99, 235, 0.2)" stroke="#2563eb" strokeWidth="2" />
        {points.map((p, i) => (
          <circle key={`c-${i}`} cx={p.valX} cy={p.valY} r="3" fill="#2563eb" />
        ))}
        {points.map((p, i) => (
          <text 
            key={`t-${i}`} 
            x={p.x + (p.x > center ? 8 : p.x < center ? -8 : 0)} 
            y={p.y + (p.y > center ? 12 : p.y < center ? -4 : 0)} 
            textAnchor={p.x > center + 8 ? "start" : p.x < center - 8 ? "end" : "middle"}
            fontSize="9" 
            fontWeight="bold"
            fill="#64748b"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 3. 右侧学习与对练工作台子组件 (独立管理状态，高度隔离)
// -----------------------------------------------------------------------------
const LearningWorkspace = ({ customer, onComplete }) => {
  const practiceQueue = useMemo(() => Object.values(customer.knowledgeCardsByTab).flat(), [customer]);
  
  // 自动定位到第一个有缺口的标签页
  const initialTabId = useMemo(() => {
    const tabsWithCards = Object.keys(customer.knowledgeCardsByTab).find(key => customer.knowledgeCardsByTab[key] && customer.knowledgeCardsByTab[key].length > 0);
    return tabsWithCards ? parseInt(tabsWithCards, 10) : 1;
  }, [customer]);

  const [activeTab, setActiveTab] = useState(initialTabId);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [readCards, setReadCards] = useState(new Set());

  const [showRolePlay, setShowRolePlay] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [isCurrentPassed, setIsCurrentPassed] = useState(false); 
  const [rolePlayCompleted, setRolePlayCompleted] = useState(false); 
  const chatEndRef = useRef(null);

  const tabs = [
    { id: 0, name: "开场破冰" },
    { id: 1, name: "需求分析" },
    { id: 2, name: "场景塑造" },
    { id: 3, name: "产品推荐" },
    { id: 4, name: "异议处理" },
    { id: 5, name: "合规促单" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setReadingTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentCards = useMemo(() => customer.knowledgeCardsByTab[activeTab] || [], [customer, activeTab]);
  const currentCard = useMemo(() => currentCards[activeCardIndex], [currentCards, activeCardIndex]);
  const totalCards = practiceQueue.length;
  const isAllRead = useMemo(() => readCards.size >= totalCards, [readCards.size, totalCards]);

  useEffect(() => {
    if (currentCard && currentCard.id) {
      setReadCards(prev => {
        if (!prev.has(currentCard.id)) {
           const newSet = new Set(prev);
           newSet.add(currentCard.id);
           return newSet;
        }
        return prev;
      });
    }
  }, [currentCard?.id]);

  const hasUnreadInTab = useCallback((tabId) => {
    const cardsInTab = customer.knowledgeCardsByTab[tabId] || [];
    if (cardsInTab.length === 0) return false;
    return !cardsInTab.every(card => readCards.has(card.id));
  }, [customer, readCards]);

  const handleStartRolePlay = () => {
    setShowRolePlay(true);
    setCurrentPracticeIndex(0);
    setIsCurrentPassed(false);
    setChatHistory([
      { id: Date.now(), role: 'scenario', content: practiceQueue[0].scenario },
      { id: Date.now() + 1, role: 'customer', content: practiceQueue[0].trigger, label: `${customer.name} (客户)` }
    ]);
  };

  const handleSendMessage = () => {
    if (!userInput.trim() || isEvaluating) return;
    const text = userInput.trim();
    setChatHistory(prev => [...prev, { id: Date.now(), role: 'sales', content: text, label: '我' }]);
    setUserInput('');
    setIsEvaluating(true);

    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai-coach',
        content: '点评：策略执行得很棒！你成功抓住了客户心理并化解了异议。语调也很自然。',
        passed: true,
        label: 'AI 区域督导'
      }]);
      setIsEvaluating(false);
      setIsCurrentPassed(true);
      if (currentPracticeIndex === practiceQueue.length - 1) setRolePlayCompleted(true);
    }, 1500);
  };

  useEffect(() => {
    if (chatEndRef.current && showRolePlay) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, showRolePlay, isEvaluating]);

  return (
    // 使用 overflow-hidden 锁定外层，防止任何意料之外的滚动
    <main className="flex-1 bg-white flex flex-col h-full relative animate-in fade-in duration-300 overflow-hidden">
      {/* 顶部 Header: 严禁滚动 (flex-shrink-0) */}
      <header className="h-[72px] px-8 border-b border-gray-100 flex items-center justify-between flex-shrink-0 z-20 bg-white">
        <div>
          <h1 className="text-xl font-bold text-gray-900">2025年10月11日短课程学习室</h1>
          <p className="text-[12px] text-gray-500 mt-1">正在复盘客户：<span className="font-bold text-gray-700">{customer.name}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-100">
            <Clock className="w-4 h-4" /> 学习时长：{Math.floor(readingTime/60)}:{(readingTime%60).toString().padStart(2,'0')}
          </div>
        </div>
      </header>

      {!showRolePlay ? (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/30">
          {/* 标签栏: 严禁滚动 */}
          <div className="px-8 py-5 border-b border-gray-100 bg-white flex-shrink-0 z-10">
            <div className="flex items-center gap-3">
              {tabs.map((tab) => {
                const unread = hasUnreadInTab(tab.id);
                const hasCards = (customer.knowledgeCardsByTab[tab.id] || []).length > 0;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {setActiveTab(tab.id); setActiveCardIndex(0);}}
                    className={`relative px-6 py-2.5 rounded-full text-[14px] font-bold transition-all ${
                      activeTab === tab.id ? 'bg-[#1A56FF] text-white shadow-md' : hasCards ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-100' 
                    }`}
                  >
                    {tab.name}
                    {unread && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 卡片内容区: 仅此处允许垂直滚动 */}
          <div className="flex-1 overflow-y-auto p-8 relative hide-scrollbar">
            {currentCards.length > 0 ? (
              <div className="max-w-4xl mx-auto h-full flex flex-col animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600"/> 话术改进明细 ({activeCardIndex + 1}/{currentCards.length})
                  </h2>
                </div>

                <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
                  <div className="col-span-5 flex flex-col gap-4">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col gap-5">
                      
                      {/* 1. 客户原话 */}
                      <div>
                        <h3 className="text-[13px] font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                          <MessageSquareWarning className="w-4 h-4"/> 客户原话
                        </h3>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[14px] text-gray-700 leading-relaxed italic shadow-inner">
                          “{currentCard.trigger}”
                        </div>
                      </div>
                      
                      {/* 2. 话术诊断 */}
                      <div>
                        <h3 className="text-[13px] font-bold text-rose-500 mb-2 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4"/> 话术诊断
                        </h3>
                        <div className="bg-rose-50/80 p-4 rounded-xl border border-rose-100 text-[14px] text-gray-700 leading-relaxed">
                          {currentCard.analysis}
                        </div>
                      </div>

                      {/* 3. 技巧策略 */}
                      <div className="mt-auto">
                        <h3 className="text-[13px] font-bold text-amber-500 mb-2 flex items-center gap-1.5">
                          <Megaphone className="w-4 h-4"/> 技巧策略
                        </h3>
                        <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-100 text-[14px] text-gray-800 leading-relaxed font-bold">
                          {currentCard.strategy}
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="col-span-7 flex flex-col gap-4">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
                      
                      {/* 您的当时回复 - 增加对比区块 */}
                      <div className="mb-3 relative">
                        <h3 className="text-[13px] font-bold text-gray-500 mb-2 flex items-center gap-1.5 tracking-wider">
                          <UserCircle className="w-4 h-4"/>您的当时回复
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-[15px] text-gray-500 line-through decoration-gray-300">
                          “{currentCard.salesQuote}”
                        </div>
                        {/* 转化箭头指示器 */}
                        <div className="absolute -bottom-4 left-6 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm z-10">
                          <ArrowRight className="w-4 h-4 text-blue-500 transform rotate-90" />
                        </div>
                      </div>

                      <div className="mt-2 flex-1 flex flex-col">
                        <h3 className="text-[13px] font-bold text-blue-500 mb-3 flex items-center gap-1.5 uppercase tracking-wider"><Quote className="w-4 h-4"/>金牌话术实践</h3>
                        <div className="bg-gradient-to-br from-blue-50 to-[#F0F4FF] p-5 rounded-xl border border-blue-100 mb-4 flex-1">
                          <p className="text-[16px] text-gray-900 leading-loose font-semibold">{currentCard.script}</p>
                        </div>
                      </div>
                      
                      {currentCard.hasVisual && (
                        <div className="mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-[13px] font-bold text-purple-600 flex items-center gap-1.5"><ImageIcon className="w-4 h-4"/>对标视觉案例</h3>
                            <button className="text-[12px] bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg font-bold hover:bg-purple-100 transition-colors">保存至图库</button>
                          </div>
                          <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center h-[180px]">
                            <img src={currentCard.visualData.url} alt="视觉弹药" className="h-full w-full object-contain" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {currentCards.length > 1 && (
                  <div className="flex justify-between items-center mt-6">
                    <button onClick={() => setActiveCardIndex(p => Math.max(0, p-1))} disabled={activeCardIndex === 0} className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-colors">
                      <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                    </button>
                    <div className="flex gap-2">
                      {currentCards.map((_, idx) => (
                        <div key={idx} className={`h-2 rounded-full transition-all ${activeCardIndex === idx ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'}`} />
                      ))}
                    </div>
                    <button onClick={() => setActiveCardIndex(p => Math.min(currentCards.length-1, p+1))} disabled={activeCardIndex === currentCards.length-1} className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-colors">
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center pt-20 animate-in fade-in">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">此阶段表现完美</h3>
                <p className="text-gray-500 text-lg">系统未在录音中检测到该阶段的话术短板，请切换其他存在红点的标签页。</p>
              </div>
            )}
          </div>

          {/* 底部行动栏: 严禁滚动 */}
          <div className="px-8 py-5 bg-white border-t border-gray-100 flex-shrink-0 z-10">
            {isAllRead ? (
              <button onClick={handleStartRolePlay} className="w-full bg-[#1A56FF] hover:bg-blue-700 text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.99]">
                🎙️ 知识已掌握，开启模拟对练
              </button>
            ) : (
              <button disabled className="w-full bg-gray-100 text-gray-400 font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed">
                <Lock className="w-5 h-5" /> 需阅读全部红点知识点后解锁对练 ({readCards.size}/{totalCards})
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-[#F8FAFC] animate-in slide-in-from-bottom duration-300 overflow-hidden">
          {/* 对练顶部: 严禁滚动 */}
          <div className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-sm flex-shrink-0 z-10">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg"><Bot className="w-6 h-6 text-blue-600"/></div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">实战对练室</h2>
                <p className="text-sm text-gray-500">当前进度：场景 {currentPracticeIndex + 1}/{practiceQueue.length}</p>
              </div>
            </div>
            <button onClick={() => setShowRolePlay(false)} className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-full font-bold text-sm transition-colors">
              返回知识学习
            </button>
          </div>

          {/* 对练对话流区域: 仅此处允许垂直滚动 */}
          <div className="flex-1 overflow-y-auto p-8 hide-scrollbar">
            <div className="max-w-4xl mx-auto space-y-6">
              {chatHistory.map((msg, index) => {
                if (msg.role === 'scenario') {
                  return (
                    <div key={msg.id} className="w-full my-6 animate-in fade-in">
                      <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden border border-slate-700">
                        <div className="absolute -right-4 -bottom-4 opacity-10"><Clapperboard className="w-32 h-32" /></div>
                        <h4 className="text-blue-300 text-sm font-bold mb-3 flex items-center gap-2 tracking-widest uppercase">
                          <Clapperboard className="w-4 h-4" /> 场景提要 {currentPracticeIndex + 1}
                        </h4>
                        <p className="text-[16px] leading-relaxed relative z-10">{msg.content}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className={`flex flex-col animate-in fade-in ${msg.role === 'sales' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[12px] text-gray-400 mb-1.5 px-2">{msg.label}</span>
                    {msg.role === 'customer' && (
                      <div className="bg-white border border-gray-200 text-gray-800 text-[16px] p-5 rounded-3xl rounded-tl-sm shadow-sm max-w-[80%] leading-relaxed">
                        “{msg.content}”
                      </div>
                    )}
                    {msg.role === 'sales' && (
                      <div className="bg-blue-600 text-white text-[16px] p-5 rounded-3xl rounded-tr-sm shadow-md shadow-blue-500/20 max-w-[80%] leading-relaxed">
                        {msg.content}
                      </div>
                    )}
                    {msg.role === 'ai-coach' && (
                      <div className={`mt-3 p-5 rounded-2xl max-w-[85%] border shadow-sm ${msg.passed ? 'bg-green-50 border-green-200' : 'bg-rose-50 border-rose-200'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          {msg.passed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
                          <span className={`font-bold text-[15px] ${msg.passed ? 'text-green-700' : 'text-rose-700'}`}>AI 督导点评</span>
                        </div>
                        <p className="text-[15px] text-gray-800 leading-relaxed">{msg.content}</p>
                      </div>
                    )}
                  </div>
                );
              })}
              {isEvaluating && (
                <div className="flex items-start flex-col animate-in fade-in">
                   <span className="text-[12px] text-gray-400 mb-1.5 px-2">AI 区域督导</span>
                   <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></span>
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                   </div>
                </div>
              )}
              {/* 用于保持滚动的锚点 */}
              <div ref={chatEndRef} className="h-8" />
            </div>
          </div>

          {/* 对练底部操作区: 严禁滚动 */}
          <div className="bg-white border-t border-gray-100 p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex-shrink-0 z-10">
            <div className="max-w-4xl mx-auto">
              {!isCurrentPassed && !rolePlayCompleted && (
                <div className="flex items-end gap-3">
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="在此输入您的应对话术..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-[80px]"
                    disabled={isEvaluating}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() || isEvaluating}
                    className="w-[80px] h-[80px] bg-[#1A56FF] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center text-white transition-colors shadow-md shadow-blue-500/20 active:scale-95"
                  >
                    <Send className="w-8 h-8 -ml-1" />
                  </button>
                </div>
              )}
              {isCurrentPassed && currentPracticeIndex < practiceQueue.length - 1 && (
                <button onClick={() => {
                    const nextIdx = currentPracticeIndex + 1;
                    setCurrentPracticeIndex(nextIdx);
                    setIsCurrentPassed(false);
                    setChatHistory(prev => [
                      ...prev,
                      { id: Date.now(), role: 'scenario', content: practiceQueue[nextIdx].scenario },
                      { id: Date.now()+1, role: 'customer', content: practiceQueue[nextIdx].trigger, label: customer.name }
                    ]);
                  }} 
                  className="w-full bg-blue-50 text-blue-700 border border-blue-200 font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors animate-in slide-in-from-bottom"
                >
                  进入下一场景考核 <ArrowRight className="w-5 h-5" />
                </button>
              )}
              {rolePlayCompleted && (
                <button onClick={() => onComplete(customer.id)} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all animate-in slide-in-from-bottom active:scale-[0.99]">
                  🎉 本客流考核完成，点击结案
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

// -----------------------------------------------------------------------------
// 4. 平板端主界面组件 (管理全局状态和左侧栏)
// -----------------------------------------------------------------------------
export default function TargetedLearningTablet() {
  const [course, setCourse] = useState(mockCourseData);
  const [selectedCustomerId, setSelectedCustomerId] = useState(course.customers[0].id);

  // 获取当前选中的客户详情
  const selectedCustomer = useMemo(() => {
    return course.customers.find(c => c.id === selectedCustomerId) || course.customers[0];
  }, [course, selectedCustomerId]);

  // 处理单个客流的对练结案
  const handleCustomerComplete = (customerId) => {
    setCourse(prev => {
      const updatedCustomers = prev.customers.map(c => 
        c.id === customerId ? { ...c, status: 'completed' } : c
      );
      return { ...prev, customers: updatedCustomers };
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6 font-sans">
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
      
      {/* 平板外框 - 设置固定高度与溢出隐藏 */}
      <div className="w-full max-w-[1180px] h-[820px] bg-white rounded-[32px] shadow-2xl flex overflow-hidden border-[8px] border-gray-900 ring-4 ring-gray-300 relative">
        
        {/* 左侧栏 (约30%) - 严禁跟随右侧滚动 */}
        <aside className="w-[340px] bg-[#F8FAFC] border-r border-gray-200 flex flex-col flex-shrink-0 h-full relative z-10">
          
          {/* 1. 人员基本信息 */}
          <div className="p-6 border-b border-gray-200 bg-white flex-shrink-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
                林
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
                  林创润 <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">驻店人员</span>
                </h2>
                <p className="text-[12px] text-gray-500 flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5"/> 驻店时间：12个月以上</p>
              </div>
            </div>
            <div className="text-[12px] text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-start gap-2">
              <Network className="w-4 h-4 text-gray-400 mt-0.5" />
              <span>直属上级：林泽娜，lianghh，张伟...</span>
            </div>
          </div>

          {/* 2. 战败复盘与能力评估 (内部滚动区) */}
          <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col">
            <div className="p-6 pb-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-800 text-[15px] flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-rose-500"/> 能力雷达图
                </h3>
                <span className="text-[11px] text-gray-400 font-medium">{course.reviewDate}</span>
              </div>
              
              {/* 雷达图 */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <RadarChart data={course.radarData} />
                <div className="mt-2 text-center">
                  
                </div>
              </div>
            </div>

            {/* 3. 关联异常客流明细列表 */}
            <div className="p-6 pt-4 flex-1">
              <h3 className="font-bold text-gray-800 text-[15px] mb-3 flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-blue-500" /> 待复盘清单 ({course.customers.length}单)
              </h3>
              <div className="space-y-3">
                {course.customers.map((c) => {
                  const isSelected = c.id === selectedCustomerId;
                  const isCompleted = c.status === 'completed';
                  return (
                    <div 
                      key={c.id}
                      onClick={() => setSelectedCustomerId(c.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50/40 shadow-md ring-2 ring-blue-100' 
                          : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900 text-[15px] flex items-center gap-2">
                            {c.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                            <Car className="w-3 h-3"/> {c.carModel}
                          </p>
                        </div>
                        <div>
                          {isCompleted ? (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />已结案
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md border border-rose-100 animate-pulse flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />待复盘
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* 右侧栏 (约70%) - 使用 Key 强制在切换客户时重置整个学习组件的状态 */}
        <LearningWorkspace 
          key={selectedCustomer.id} 
          customer={selectedCustomer} 
          onComplete={handleCustomerComplete} 
        />

      </div>
    </div>
  );
}