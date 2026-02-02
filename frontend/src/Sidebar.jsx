import './Sidebar.css'

function Sidebar(props){
    return (
        <nav className = "sidebar">
            <button
                className = {props.activeTab === 'dashboard'?'tab-button active':'tab-button'}
                onClick = {() => props.onTabChange('dashboard')}
            >
                Dashboard
            </button>
            <button
                className = {props.activeTab === 'habits'?'tab-button active':'tab-button'}
                onClick = {() => props.onTabChange('habits')}
            >
                Habits
            </button>
            <button
                className = {props.activeTab === 'tasks'?'tab-button active':'tab-button'}
                onClick = {() => props.onTabChange('tasks')}
            >
                Tasks
            </button>
        </nav>
    )
}
export default Sidebar