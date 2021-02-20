<template>
  <div class="wrapper">
    <ul>
      <li>商品信息1</li>
      <li>商品信息2</li>
      <li>商品信息3</li>
      <li>商品信息4</li>
      <li>商品信息5</li>
      <li>商品信息6</li>
      <li>商品信息7</li>
      <li>商品信息8</li>
      <li>商品信息9</li>
      <li>商品信息10</li>
      <li>商品信息11</li>
      <li>商品信息12</li>
      <li>商品信息13</li>
      <li>商品信息14</li>
      <li>商品信息15</li>
      <li>商品信息16</li>
      <li>商品信息17</li>
      <li>商品信息18</li>
      <li>商品信息19</li>
      <li>商品信息20</li>
      <li>商品信息21</li>
      <li>商品信息22</li>
      <li>商品信息23</li>
      <li>商品信息24</li>
      <li>商品信息25</li>
      <li>商品信息26</li>
      <li>商品信息27</li>
      <li>商品信息28</li>
      <li>商品信息29</li>
      <li>商品信息30</li>
      <li>商品信息31</li>
      <li>商品信息32</li>
      <li>商品信息33</li>
      <li>商品信息34</li>
      <li>商品信息35</li>
      <li>商品信息36</li>
      <li>商品信息37</li>
      <li>商品信息38</li>
      <li>商品信息39</li>
      <li>商品信息40</li>
      <li>商品信息41</li>
      <li>商品信息42</li>
      <li>商品信息43</li>
      <li>商品信息44</li>
      <li>商品信息45</li>
      <li>商品信息46</li>
      <li>商品信息47</li>
      <li>商品信息48</li>
      <li>商品信息49</li>
      <li>商品信息50</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
   name: 'Category',
   data() {
     return {
       scroll: null
     }
   },
   mounted() {
     this.scroll = new BScroll(document.querySelector('.wrapper'), {

     })
   }
}
</script>

<style>
  .wrapper {
    height: 150px;
    background-color: grey;
    overflow: hidden;
  }
</style>