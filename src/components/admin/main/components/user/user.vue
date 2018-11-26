<template>
    <div class="user-avator-dropdown">
        <Dropdown @on-click="handleClick">
            <Avatar :src="userAvator" />
            <span>{{userName}}</span>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import "./user.less";
import { mapActions } from "vuex";
// const {  mapActions } = createNamespacedHelpers("user");
export default {
    name: "User",
    props: {
        userAvator: {
            type: String,
            default: ""
        },
        userName: {
            type: String,
            default: ""
        }
    },
    methods: {
        ...mapActions(["handleLogOut"]),
        handleClick(name) {
            switch (name) {
                case "logout":
                    localStorage.departmentData = '';
                    this.handleLogOut().then(() => {
                        this.$router.push({
                            name: "login"
                        });
                    });
                    break;
            }
        }
    }
};
</script>
