import { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import './Chatbot.css'

const Chatbot = () => {
  const { currentUser, employees, leaveRequests, attendance, getAttendanceSummary, formatCurrency, getNetSalary } = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Hi there! I am your TechEMS AI Assistant. How can I help you today?` }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }])
    setInput('')

    setTimeout(() => {
      const response = generateResponse(userMessage)
      setMessages(prev => [...prev, { sender: 'bot', text: response }])
    }, 600)
  }

  const generateResponse = (query) => {
    const q = query.toLowerCase()
    const isReadyAdmin = currentUser?.role === 'admin'
    const isReadyEmployee = currentUser?.role === 'employee'

    // General commands
    if (q.includes('hello') || q.includes('hi ') || q.includes('hey')) {
      return `Hello! How can I assist you with the system today?`
    }

    if (q.includes('help') || q.includes('what can you do')) {
      if (isReadyAdmin) {
        return `As an administrator, you can ask me questions like:
- "How many employees are there?"
- "What is the total payroll?"
- "Show me pending leave requests."
- "What's the attendance rate today?"`
      } else if (isReadyEmployee) {
        return `As an employee, you can ask me:
- "What is my current salary?"
- "Show my attendance summary."
- "How many leave requests do I have?"
- "How do I download my salary slip?"`
      } else {
        return `Please log in to query specific details. You can log in as an Admin or one of the 4 employee accounts!`
      }
    }

    // Role-specific responses
    if (isReadyAdmin) {
      if (q.includes('employee count') || q.includes('how many employees') || q.includes('total employees')) {
        return `There are currently ${employees.length} employees registered in the system.`
      }
      if (q.includes('payroll') || q.includes('salary expense') || q.includes('total payroll')) {
        const total = employees.reduce((s, e) => s + getNetSalary(e), 0)
        return `The total monthly payroll payout is ${formatCurrency(total)}.`
      }
      if (q.includes('leave') || q.includes('pending leaves') || q.includes('requests')) {
        const pending = leaveRequests.filter(l => l.status === 'pending').length
        return `There are currently ${pending} pending leave request(s) awaiting your approval.`
      }
      if (q.includes('attendance') || q.includes('present today')) {
        const todayStr = new Date().toISOString().split('T')[0]
        let presentCount = 0
        employees.forEach(emp => {
          if (attendance[emp.id]?.[todayStr] === 'present') presentCount++
        })
        const rate = Math.round((presentCount / employees.length) * 100)
        return `Today's attendance rate is ${rate}% (${presentCount} of ${employees.length} present).`
      }
    }

    if (isReadyEmployee) {
      const empData = employees.find(e => e.id === currentUser.id)
      if (q.includes('salary') || q.includes('my pay') || q.includes('earnings')) {
        const net = getNetSalary(empData)
        return `Your current Net Salary is ${formatCurrency(net)} (Basic: ${formatCurrency(empData.basicSalary)}).`
      }
      if (q.includes('attendance') || q.includes('present') || q.includes('working days')) {
        const now = new Date()
        const s = getAttendanceSummary(currentUser.id, now.getFullYear(), now.getMonth() + 1)
        return `Your attendance summary for this month: Present: ${s.present} days, Absent: ${s.absent} days, Half Days: ${s.halfday} days, On Leave: ${s.leave} days.`
      }
      if (q.includes('leave') || q.includes('my leave requests')) {
        const myRequests = leaveRequests.filter(l => l.employeeId === currentUser.id)
        const pending = myRequests.filter(l => l.status === 'pending').length
        const approved = myRequests.filter(l => l.status === 'approved').length
        return `You have submitted ${myRequests.length} leave request(s) in total. Status: ${pending} pending, ${approved} approved.`
      }
      if (q.includes('slip') || q.includes('download')) {
        return `To download your salary slip, go to the "Salary Slips" section from the sidebar, select a month, and click "Download PDF" at the top right.`
      }
    }

    // Default fallbacks
    return `I'm not sure about that. Type "help" to see what questions I can answer for your current portal access!`
  }

  return (
    <div className={`chatbot-container no-print ${isOpen ? 'open' : ''}`}>
      {/* Floating Button */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)} id="chatbot-toggle-btn">
        <span className="chatbot-icon">{isOpen ? '✕' : '💬'}</span>
        {!isOpen && <span className="chatbot-badge">1</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window animate-bounceIn">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="cb-logo">⚡</span>
              <div>
                <h4>EMS Assistant</h4>
                <span>Online</span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`cb-message ${m.sender}`}>
                <div className="cb-bubble">{m.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chatbot-input-form" id="chatbot-form">
            <input
              type="text"
              placeholder="Ask me a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              id="chatbot-input"
              required
            />
            <button type="submit" className="cb-send-btn" id="chatbot-send-btn">➔</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Chatbot
