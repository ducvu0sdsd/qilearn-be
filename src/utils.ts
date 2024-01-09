import { SubtitleInterface } from "./broadcast/schema/broadcast.schema"


export const handleSRTFile: (str: string) => SubtitleInterface[] = (str) => {
    const arr: string[] = str.split('\n')
    const subtitles: SubtitleInterface[] = []
    let subtitle: SubtitleInterface = { id: 0, firstTime: 0, lastTime: 0, content: '' }
    arr.forEach((item1, index) => {
        const item = item1
        if (/[0-9]{1,6}\r/.test(item) && !item.includes(' --> ')) { // id
            const i = parseInt(item.replace('\r', ''))
            subtitle.id = i
        } else if (item.includes(' --> ')) { // time
            const times = item.split(' --> ')
            times.forEach((time, index) => {
                const timeSlipt = time.split(',')[0]
                if (index == 0) {
                    const first: number = timeStringToSeconds(timeSlipt)
                    subtitle.firstTime = first
                } else {
                    const last: number = timeStringToSeconds(timeSlipt)
                    subtitle.lastTime = last
                }
            })
        } else if (/[A-ZÀ-Ỹa-zà-ỹ0-9]+/.test(item.replace('- ', '')) && !item.includes(' --> ')) {
            subtitle.content += (' ' + item.replace('\r', '').replace('<i>', '').replace('</i>', ''))
        } else if (item === '\r') {
            if (subtitle.id !== 0) {
                subtitles.push(subtitle)
                subtitle = { id: 0, firstTime: 0, lastTime: 0, content: '' }
            }
        }
    })

    console.log(subtitles)

    return subtitles;
}

const timeStringToSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
};