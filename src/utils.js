export function getVotedPolls() {
    const polls = localStorage.getItem("votedPolls")
    return polls === null ? [] : JSON.parse(polls)
}

export function addVotedPoll(pollId) {
    let polls = getVotedPolls()
    polls.push(pollId)
    localStorage.setItem("votedPolls", JSON.stringify(polls))
}