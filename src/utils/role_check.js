module.exports = (roles_member, roles_required) => {
    return roles_required.filter(element => roles_member.includes(element)).length >= 1
}