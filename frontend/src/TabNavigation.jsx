import './TabNavigation.css'
function TabNavigation(props){
    return (
        <div className = 'tab-navigation'>
            <button className = {props.activeTab === 'habits'? 'tab-button active':'tab-button'}
                    onClick = {()=> props.onTabChange('habits')}
            >
                Habits
            </button>
            <button className = {props.activeTab === 'tasks'? 'tab-button active': 'tab-button'}
                    onClick = {() => props.onTabChange('tasks')}
            >
                Tasks
            </button>
        </div>
    )
}
export default TabNavigation