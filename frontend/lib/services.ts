export function createTime(createdAt: Date) {
        const currentTime = new Date()
        
        if (createdAt.getFullYear() !== currentTime.getFullYear()) {
            const day = String(createdAt.getDate()).padStart(2, '0')
            const month = String(createdAt.getMonth() + 1).padStart(2, '0')
            const year = String(createdAt.getFullYear()).slice(-2)
            return `${day}/${month}/${year}`
        }
        
        const timeDiff = currentTime.getTime() - createdAt.getTime()
        const hoursDiff = timeDiff / (1000 * 60 * 60)
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24)
        
        if (daysDiff < 1) {
            const hours = Math.floor(hoursDiff)
            if (hours === 0) {
                const minutes = Math.floor(timeDiff / (1000 * 60))
                return minutes === 0 ? 'now' : `${minutes}m`
            }
            return `${hours}h`
        }
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const day = createdAt.getDate()
        const month = monthNames[createdAt.getMonth()]
        return `${day} ${month}`
    }
    
export function getFullTime(createdAt: Date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const hour24 = createdAt.getHours()
    const hour = hour24 % 12 || 12
    const minute = String(createdAt.getMinutes()).padStart(2, '0')
    const ampm = hour24 >= 12 ? 'PM' : 'AM'
    const month = monthNames[createdAt.getMonth()]
    const day = createdAt.getDate()
    const year = createdAt.getFullYear()
    return `${hour}:${minute} ${ampm} · ${month} ${day}, ${year}`
}
