<template>
  <div class="UserModel">
  <a-transfer
    :data-source="mockData"
    show-search
    :filter-option="filterOption"
    :target-keys="targetKeys"
    :render="item => item.title"
    @change="handleChange"
    @search="handleSearch"
    listStyle="height:300px"
  />
  </div>
</template>

<style lang="less" scoped>
    .UserModel{
        margin-left: 60px;
    }
</style>

<script>
export default {
  data() {
    return {
      mockData: [],
      targetKeys: [],
    };
  },
  mounted() {
    this.getMock();
  },
  methods: {
    getMock() {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < 20; i++) {
        const data = {
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          chosen: Math.random() * 2 > 1,
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.mockData = mockData;
      this.targetKeys = targetKeys;
    },
    filterOption(inputValue, option) {
      return option.description.indexOf(inputValue) > -1;
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys;
    },
    handleSearch(dir, value) {
      console.log('search:', dir, value);
    },
  },
};
</script>