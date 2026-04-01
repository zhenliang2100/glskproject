import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Download, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Box,
  Users,
  Award,
  ShieldCheck,
  MessageSquare,
  FileText,
  AlertTriangle,
  Receipt,
  GraduationCap,
  Car,
  TrendingUp,
  Settings as SettingsIcon,
  Bell,
  User,
  LogOut,
  X,
  Check,
  Clock,
  AlertCircle,
  Upload
} from 'lucide-react';

// -----------------------------------------------------------------------------
// 1. 模拟数据 (完善 完成情况、处罚状态 及 启停开关 逻辑)
// -----------------------------------------------------------------------------
const mockData = {
  yanbao: [
    { id: 1, name: '董丽丽', phone: '16638868801', store: '洛阳新荣嘉汽车销售服务有限公司', brand: '--', tags: '专业知识,场景塑造,案例展示...(6)', date: '2026-03-28', completeTime: '2026-03-28 14:20:00', taskStatus: '已结束', progress: 100, punishMethod: '限制录单', punishStatus: '已结束', punishEnabled: true },
    { id: 2, name: '黄浩', phone: '13760940961', store: '珠海市南菱华鑫汽车销售服务有限公司', brand: '--', tags: '--', date: '2026-03-31', completeTime: '--', taskStatus: '进行中', progress: 0, punishMethod: '限制录单', punishStatus: '未触发', punishEnabled: true },
    { id: 3, name: '李子扬', phone: '18234618206', store: '山西贾锦驰汽车销售服务有限公司', brand: '--', tags: '专业知识,案例展示,身份介绍...(4)', date: '2026-03-26', completeTime: '--', taskStatus: '已结束', progress: 0, punishMethod: '限制录单', punishStatus: '处罚中', punishEnabled: true },
  ],
  qinggai: [
    { 
      id: 101, name: '林创润', phone: '13800138000', store: '深圳南山智界授权体验中心', brand: '智界', 
      date: '2026-03-31', completeTime: '--', taskStatus: '进行中', progress: 50, punishMethod: '限制录单', punishStatus: '未触发', punishEnabled: true,
      courseEndTime: '2026-04-02 18:00:00',
      tags: '需求分析, 异议处理, 场景塑造',
      customerDetails: [
        { id: 'c1', name: '黄平', carModel: '智界R7', dims: ['需求分析', '异议处理'], status: '待通关', completeTime: '--' },
        { id: 'c2', name: '王女士', carModel: '智界S7', dims: ['场景塑造'], status: '已通过', completeTime: '2026-03-31 09:12:00' }
      ]
    },
    { 
      id: 102, name: '张伟', phone: '13912345678', store: '广州天河问界用户中心', brand: '问界', 
      date: '2026-03-31', completeTime: '2026-03-31 09:30:15', taskStatus: '已结束', progress: 100, punishMethod: '限制录单', punishStatus: '已结束', punishEnabled: true,
      courseEndTime: '2026-04-02 18:00:00',
      tags: '场景塑造, 产品推荐',
      customerDetails: [
        { id: 'c1', name: '陈女士', carModel: '问界M9', dims: ['场景塑造', '产品推荐'], status: '已通过', completeTime: '2026-03-31 09:30:15' }
      ]
    },
    { 
      id: 103, name: '李子扬', phone: '18234618206', store: '山西贾锦驰汽车销售服务有限公司', brand: '综合', 
      date: '2026-03-30', completeTime: '2026-03-30 11:20:00', taskStatus: '已结束', progress: 100, punishMethod: '无惩罚', punishStatus: '已结束', punishEnabled: true,
      courseEndTime: '2026-04-01 18:00:00',
      tags: '合规促单, 开场破冰',
      customerDetails: [
        { id: 'c1', name: '王总', carModel: '理想L8', dims: ['合规促单', '开场破冰'], status: '已通过', completeTime: '2026-03-30 11:20:00' }
      ]
    },
    { 
      id: 104, name: '赵钱', phone: '13508680935', store: '十堰大雍欣弘汽车销售有限公司', brand: '综合', 
      date: '2026-03-27', completeTime: '--', taskStatus: '已结束', progress: 0, punishMethod: '限制录单', punishStatus: '处罚中', punishEnabled: true,
      courseEndTime: '2026-03-29 18:00:00',
      tags: '异议处理',
      customerDetails: [
        { id: 'c1', name: '刘先生', carModel: '小米SU7', dims: ['异议处理'], status: '待通关', completeTime: '--' }
      ]
    },
  ]
};

// -----------------------------------------------------------------------------
// 2. 主页面组件
// -----------------------------------------------------------------------------
export default function ShortCourseBackend() {
  const [activeTab, setActiveTab] = useState('qinggai');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState('learning'); 
  const [selectedTask, setSelectedTask] = useState(null); 
  const [data, setData] = useState(mockData); // 将 mockData 放入 state 以支持开关交互

  const currentData = data[activeTab];

  // 处理处罚开关的启停
  const handleTogglePunish = (id) => {
    setData(prevData => {
      const newData = { ...prevData };
      newData[activeTab] = newData[activeTab].map(item => {
        if (item.id === id) {
          const newEnabled = !item.punishEnabled;
          return { 
            ...item, 
            punishEnabled: newEnabled,
            // 如果开关被手动关闭，状态变更为已解除；如果重新开启，恢复为处罚中
            punishStatus: newEnabled ? '处罚中' : '已解除' 
          };
        }
        return item;
      });
      return newData;
    });
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans overflow-hidden">
      
      {/* ================= 左侧导航栏 ================= */}
      <aside className="w-[220px] bg-[#111827] text-gray-300 flex flex-col flex-shrink-0 h-full overflow-y-auto scrollbar-hide">
        <div className="h-14 flex items-center px-4 border-b border-gray-800 bg-[#0F172A] sticky top-0 z-10">
          <div className="flex items-center gap-2 text-white font-bold text-lg tracking-wide">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-sm italic">D</div>
            智享车生活
          </div>
        </div>

        <nav className="flex-1 py-4 space-y-1">
          <MenuItem icon={LayoutDashboard} label="AI大模型" />
          <MenuItem icon={Box} label="库存管理" />
          <MenuItem icon={Users} label="人员管理" />
          <MenuItem icon={Award} label="积分管理" />
          <MenuItem icon={ShieldCheck} label="权益配置" />
          <MenuItem icon={MessageSquare} label="话术库" />
          <MenuItem icon={FileText} label="内容管理" />
          <MenuItem icon={AlertTriangle} label="预警管理" />
          <MenuItem icon={Receipt} label="发票管理" />
          
          <div>
            <div 
              className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-800 cursor-pointer transition-colors text-white font-medium"
              onClick={() => setExpandedMenu(expandedMenu === 'learning' ? '' : 'learning')}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4" />
                学习中心
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${expandedMenu === 'learning' ? 'rotate-90' : ''}`} />
            </div>
            
            {expandedMenu === 'learning' && (
              <div className="bg-[#0B0F19] py-1">
                <SubMenuItem label="考试管理" />
                <SubMenuItem label="课程管理" />
                <SubMenuItem label="长课程配置" />
                <SubMenuItem label="短课程配置" active={true} />
              </div>
            )}
          </div>

          <MenuItem icon={Car} label="二手车管理" />
          <MenuItem icon={TrendingUp} label="销售管理" />
          <MenuItem icon={SettingsIcon} label="系统设置" />
        </nav>
      </aside>

      {/* ================= 右侧主内容区 ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-[16px] font-bold text-gray-800">SaaS+增值业务管理平台</h1>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              <Bell className="w-4 h-4" />
              <span>更新日志</span>
              <span className="bg-red-500 text-white text-[10px] px-1 rounded-sm -ml-1 -mt-2 scale-90">New</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              <User className="w-4 h-4" />
              <span>杨振亮</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600 cursor-pointer">
              <LogOut className="w-4 h-4" />
              <span>退出</span>
            </div>
          </div>
        </header>

        <div className="px-6 py-3 text-sm text-gray-500 flex items-center gap-2 bg-[#F8FAFC]">
          <LayoutDashboard className="w-4 h-4" />
          <span>学习中心</span>
          <span>/</span>
          <span className="font-medium text-gray-800">短课程配置</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          
          {/* 查询筛选区 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-20 text-right shrink-0">员工姓名：</span>
                <input type="text" placeholder="请输入员工姓名" className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-20 text-right shrink-0">手机号码：</span>
                <input type="text" placeholder="请输入手机号码" className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-20 text-right shrink-0">门店名称：</span>
                <input type="text" placeholder="请输入门店名称" className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-20 text-right shrink-0">完成情况：</span>
                <select className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 bg-white">
                  <option>全部</option>
                  <option>进行中</option>
                  <option>已结束</option>
                </select>
              </div>
              <div className="flex items-center gap-3 lg:col-span-2">
                <span className="text-sm text-gray-600 w-20 text-right shrink-0">复盘时间：</span>
                <div className="flex-1 flex items-center gap-2">
                  <input type="date" className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:border-blue-500" />
                  <span className="text-gray-400">至</span>
                  <input type="date" className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="flex items-center gap-3 lg:col-span-2">
                <span className="text-sm text-gray-600 w-20 text-right shrink-0">完成时间：</span>
                <div className="flex-1 flex items-center gap-2">
                  <input type="date" className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-400 focus:outline-none focus:border-blue-500" />
                  <span className="text-gray-400">至</span>
                  <input type="date" className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-400 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
              <button className="px-5 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 flex items-center gap-1.5 transition-colors">
                <RotateCcw className="w-4 h-4" /> 重置
              </button>
              <button className="px-5 py-1.5 bg-blue-600 border border-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-1.5 transition-colors shadow-sm">
                <Search className="w-4 h-4" /> 查询
              </button>
            </div>
          </div>

          {/* 核心数据表格区 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            
            <div className="flex items-center justify-between border-b border-gray-200 px-5 pt-3">
              <div className="flex gap-6 relative top-[1px]">
                <button 
                  onClick={() => setActiveTab('yanbao')}
                  className={`pb-3 px-1 text-[15px] font-medium transition-colors ${
                    activeTab === 'yanbao' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  延保业务
                </button>
                <button 
                  onClick={() => setActiveTab('qinggai')}
                  className={`pb-3 px-1 text-[15px] font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === 'qinggai' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  轻改业务
                  {activeTab !== 'qinggai' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                </button>
              </div>

              <div className="flex gap-3 pb-2">
                <button 
                  onClick={() => setIsConfigModalOpen(true)}
                  className="px-4 py-1.5 bg-[#EEF2FF] text-blue-700 border border-blue-200 rounded text-sm hover:bg-blue-100 flex items-center gap-1.5 font-medium transition-colors"
                >
                  <Settings className="w-4 h-4" /> 短课程配置
                </button>
                <button className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 flex items-center gap-1.5 transition-colors">
                  <Download className="w-4 h-4" /> 导出
                </button>
              </div>
            </div>

            {/* 表格 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-600 bg-gray-50/80 border-b border-gray-200 whitespace-nowrap">
                  <tr>
                    <th className="px-5 py-3 font-medium w-12 text-center">序号</th>
                    <th className="px-4 py-3 font-medium">员工姓名</th>
                    <th className="px-4 py-3 font-medium">手机号码</th>
                    <th className="px-4 py-3 font-medium min-w-[180px]">门店名称</th>
                    
                    {activeTab === 'qinggai' && <th className="px-4 py-3 font-medium min-w-[150px]">战败客户明细</th>}
                    {activeTab === 'yanbao' && <th className="px-4 py-3 font-medium">主营品牌</th>}
                    
                    <th className="px-4 py-3 font-medium min-w-[160px]">能力短板维度</th>
                    <th className="px-4 py-3 font-medium">复盘日期</th>
                    <th className="px-4 py-3 font-medium min-w-[120px]">完成情况</th>
                    <th className="px-4 py-3 font-medium">完成时间</th>
                    
                    <th className="px-4 py-3 font-medium">处罚方式</th>
                    <th className="px-4 py-3 font-medium text-center">处罚状态</th>
                    <th className="px-4 py-3 font-medium text-center">处罚启停</th>
                    
                    <th className="px-4 py-3 font-medium text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentData.map((row, index) => {
                    // 判断开关是否允许点击：
                    // 如果任务进行中 (时间未到) -> 禁用
                    // 如果任务已结束且已完成 (有成绩) -> 禁用
                    // 仅当任务已结束且未完成 (逾期需受罚) 时，允许手动启停
                    const isTaskCompleted = row.taskStatus === '已结束' && row.completeTime !== '--';
                    const isTaskInProgress = row.taskStatus === '进行中';
                    const isToggleDisabled = isTaskCompleted || isTaskInProgress || row.punishMethod === '无惩罚';

                    return (
                      <tr key={row.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-5 py-3 text-center text-gray-500">{index + 1}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{row.name}</td>
                        <td className="px-4 py-3 text-gray-600">{row.phone}</td>
                        <td className="px-4 py-3 text-gray-600 truncate max-w-[180px]" title={row.store}>{row.store}</td>
                        
                        {activeTab === 'qinggai' && (
                          <td className="px-4 py-3 text-gray-700">
                            {row.customerDetails?.map(c => `${c.name}(${c.carModel})`).join('，')}
                          </td>
                        )}
                        
                        {activeTab === 'yanbao' && (
                          <td className="px-4 py-3 text-gray-500">{row.brand}</td>
                        )}
                        
                        <td className="px-4 py-3 text-gray-500 truncate max-w-[180px]" title={row.tags}>
                          {activeTab === 'qinggai' ? (
                            <div className="flex gap-1 flex-wrap">
                              {row.tags.split(',').map((tag, i) => (
                                <span key={i} className="bg-gray-100 border border-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs">{tag.trim()}</span>
                              ))}
                            </div>
                          ) : (
                            row.tags
                          )}
                        </td>
                        
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.date}</td>
                        
                        {/* 完成情况 */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          {row.taskStatus === '已结束' ? (
                            <span className="flex items-center gap-1.5 text-gray-500">
                              <span className="w-2 h-2 rounded-full bg-gray-400"></span> 已结束
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-yellow-600">
                              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> 进行中({row.progress}%)
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{row.completeTime}</td>
                        
                        <td className="px-4 py-3 text-gray-600">{row.punishMethod}</td>
                        
                        {/* 处罚状态 */}
                        <td className="px-4 py-3 text-center whitespace-nowrap">
                          {row.punishStatus === '处罚中' ? (
                            <span className="flex items-center justify-center gap-1 text-red-600">
                              <span className="w-2 h-2 rounded-full bg-red-500"></span> 处罚中
                            </span>
                          ) : row.punishStatus === '未触发' ? (
                            <span className="flex items-center justify-center gap-1 text-yellow-600">
                              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> 未触发
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-1 text-gray-500">
                              <span className="w-2 h-2 rounded-full bg-gray-400"></span> {row.punishStatus}
                            </span>
                          )}
                        </td>
                        
                        {/* 处罚启停 */}
                        <td className="px-4 py-3 text-center">
                          <label className={`relative inline-flex items-center ${isToggleDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={row.punishEnabled}
                              disabled={isToggleDisabled}
                              onChange={() => handleTogglePunish(row.id)}
                            />
                            <div className="w-10 h-[22px] bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>

                        <td className="px-4 py-3 text-center">
                          <button 
                            onClick={() => setSelectedTask(row)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                          >
                            查看
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50 rounded-b-lg">
              <div className="flex items-center gap-2">
                <span>10条/页</span>
                <span>共 {currentData.length} 条</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-white bg-gray-50 text-gray-400 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                <button className="w-8 h-8 flex items-center justify-center border border-blue-600 rounded bg-blue-600 text-white font-medium shadow-sm">1</button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-white bg-white text-gray-600">2</button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-white bg-white text-gray-600">10</button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-white bg-white text-gray-600"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= 任务详情弹窗 ================= */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-2xl w-[750px] overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">任务详情</h2>
              <button 
                onClick={() => setSelectedTask(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-white">
              
              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">个人信息</h3>
                <div className="grid grid-cols-2 gap-y-4 px-4 text-[14px]">
                  <div className="flex">
                    <span className="text-gray-500 w-16">姓名：</span>
                    <span className="text-gray-900">{selectedTask.name}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-16">门店：</span>
                    <span className="text-gray-900 flex-1">{selectedTask.store}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-16">上级：</span>
                    <span className="text-gray-900">-</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-16">导师：</span>
                    <span className="text-gray-900">-</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">任务信息</h3>
                <div className="grid grid-cols-2 gap-y-4 px-4 text-[14px]">
                  <div className="flex">
                    <span className="text-gray-500 w-24">复盘日期：</span>
                    <span className="text-gray-900">{selectedTask.date}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 w-24">完成情况：</span>
                    <span className="flex items-center gap-1.5 text-gray-900">
                      {selectedTask.taskStatus === '已结束' ? (
                        <><span className="w-2 h-2 rounded-full bg-gray-400"></span> 已结束</>
                      ) : (
                        <><span className="w-2 h-2 rounded-full bg-blue-500"></span> 进行中</>
                      )}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-24">涉及客户数：</span>
                    <span className="text-gray-900">{selectedTask.customerDetails?.length || 0} 单</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-24">课程结束时间：</span>
                    <span className="text-gray-900 font-medium">{selectedTask.courseEndTime || '--'}</span>
                  </div>
                  <div className="flex col-span-2">
                    <span className="text-gray-500 w-24">整体完成时间：</span>
                    <span className="text-gray-900">{selectedTask.completeTime}</span>
                  </div>
                </div>
              </div>

              {activeTab === 'qinggai' && (
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800 mb-3 border-b border-gray-100 pb-2">客流复盘明细</h3>
                  <div className="border border-gray-200 rounded text-[13px] overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-2.5 font-medium text-center w-14">序号</th>
                          <th className="px-4 py-2.5 font-medium">客户姓名</th>
                          <th className="px-4 py-2.5 font-medium">意向车型</th>
                          <th className="px-4 py-2.5 font-medium min-w-[150px]">靶向学习维度</th>
                          <th className="px-4 py-2.5 font-medium text-center">对练考核结果</th>
                          <th className="px-4 py-2.5 font-medium">完成时间</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedTask.customerDetails && selectedTask.customerDetails.length > 0 ? (
                          selectedTask.customerDetails.map((cust, idx) => (
                            <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-center text-gray-500">{idx + 1}</td>
                              <td className="px-4 py-3 font-medium text-gray-800">{cust.name}</td>
                              <td className="px-4 py-3 text-gray-600">{cust.carModel}</td>
                              <td className="px-4 py-3 text-gray-600">
                                <div className="flex gap-1 flex-wrap">
                                  {cust.dims.map((dim, i) => (
                                    <span key={i} className="bg-gray-100 border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-xs">{dim}</span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                {cust.status === '已通过' ? (
                                  <span className="text-emerald-600 flex items-center justify-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>已通过
                                  </span>
                                ) : (
                                  <span className="text-gray-400 flex items-center justify-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>待对练
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-gray-500">{cust.completeTime}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-4 py-8 text-center text-gray-400">暂无明细数据</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedTask(null)}
                className="px-6 py-2 bg-[#2E5BFF] text-white rounded text-sm hover:bg-blue-700 transition-colors shadow-sm"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 短课程触发规则配置弹窗 ================= */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-[600px] overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-[16px] font-bold text-gray-800">短课程配课</h2>
              <button onClick={() => setIsConfigModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              <div className="flex items-center gap-4 pl-2">
                <span className="font-bold text-gray-800 text-[14px]">开启课程：</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E5BFF]"></div>
                </label>
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">学习条件</h3>
                <div className="space-y-6 px-2">
                  <div className="flex items-start gap-2 text-[14px] text-gray-700">
                    <span className="text-red-500 mt-0.5">*</span>
                    <div className="leading-relaxed">
                      每天 <span className="font-bold">09:00</span> 推送前一天驻店接待记录为 <span className="font-bold text-red-500">战败</span> 的短课程学习
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">*</span>
                    <div className="flex-1">
                      <div className="text-[14px] text-gray-700 mb-3">适用人员（白名单手机号导入）</div>
                      <div className="border border-dashed border-gray-300 rounded-lg p-5 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-blue-50 text-[#2E5BFF] rounded-full flex items-center justify-center mb-2">
                          <Upload className="w-5 h-5" />
                        </div>
                        <span className="text-[13px] text-[#2E5BFF] font-medium">点击上传 Excel 表格</span>
                        <span className="text-[12px] text-gray-400 mt-1">仅支持包含驻店销售手机号的 .xlsx 或 .xls 文件</span>
                      </div>
                      <div className="mt-3 text-[12px] text-gray-500 flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span>已成功导入：<span className="font-bold text-gray-800">42</span> 人</span>
                        <span className="text-[#2E5BFF] cursor-pointer hover:underline font-medium">查看名单</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">学习要求</h3>
                <div className="space-y-5 px-2">
                  <div className="flex items-center gap-2 text-[14px] text-gray-700">
                    <span className="text-red-500">*</span>
                    短课程学习需要在课程发布后
                    <input type="number" defaultValue="72" className="w-16 border border-gray-300 rounded px-2 py-1.5 text-center focus:outline-none focus:border-[#2E5BFF]" />
                    小时内完成
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-gray-700">
                    <span className="text-red-500">*</span>
                    如果在限时内未完成则
                    <select className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-[#2E5BFF] bg-white w-32">
                      <option>限制录单</option>
                      <option>无惩罚</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-gray-700">
                    <span className="text-red-500">*</span>
                    生效时间为
                    <select className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-[#2E5BFF] bg-white w-32">
                      <option>立即生效</option>
                      <option>次日生效</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end gap-3">
              <button onClick={() => setIsConfigModalOpen(false)} className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded text-[14px] font-medium hover:bg-gray-50 transition-colors">取消</button>
              <button onClick={() => setIsConfigModalOpen(false)} className="px-6 py-2 bg-[#2E5BFF] text-white rounded text-[14px] font-medium hover:bg-blue-700 transition-colors shadow-sm">提交</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function MenuItem({ icon: Icon, label, active }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors ${active ? 'bg-blue-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300'}`}>
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </div>
  );
}

function SubMenuItem({ label, active }) {
  return (
    <div className={`pl-11 pr-4 py-2.5 text-sm cursor-pointer transition-colors relative ${active ? 'text-blue-400 font-medium' : 'text-gray-400 hover:text-gray-200'}`}>
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>}
      {label}
    </div>
  );
}

