function getNewNotificationCount(notifications, classIdentifier) {
    let newCount = 0;
    for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].classList.contains(classIdentifier)) {
            newCount++;
        }
    }

    return newCount;
} 

function removeUnseenStatusFromNotification(div, child) {
    div.classList.remove("notification--unseen");
    if (child != null) {
        child.classList.remove("unseen-text");
    }
}

function removeUnseenStatus(e) {
    const div = e.target;
    const textChild = div.getElementsByClassName("notification__text")[0];
    removeUnseenStatusFromNotification(e.target, textChild);
}

function handleMarkAllAsReadButtonClick(e, notifications) {
    e.preventDefault();
    for (let i = 0; i < notifications.length; i++) {
        const textChild = notifications[i].getElementsByClassName("notification__text")[0];
        removeUnseenStatusFromNotification(notifications[i], textChild);

    } 
}

function AdjustNotificationCount(notifications) {
    const newNotificationCountContainer = document.getElementsByClassName("header__title--emphasised")[0];
    newNotificationCountContainer.textContent = getNewNotificationCount(notifications, "notification--unseen");
}

function setupListeners(notifications) {
    const markAllReadButton = document.getElementsByClassName("header__button")[0];
    for (let i = 0; i < notifications.length; i++) {
        notifications[i].addEventListener('click', (e) => {
            removeUnseenStatus(e);
            AdjustNotificationCount(notifications);
        });
    }
    markAllReadButton.addEventListener('click', (e) => {
        handleMarkAllAsReadButtonClick(e, notifications);
        AdjustNotificationCount(notifications);
    });
}

function main() {
    const notifications = document.getElementsByClassName('notification');
    AdjustNotificationCount(notifications);
    setupListeners(notifications);
}

main();
