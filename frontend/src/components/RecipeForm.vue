<script setup>
import { ref, useTemplateRef } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const props = defineProps({
    recipe: { type: Object, required: true },
});

</script>
<template>
    <form @submit = "">
        <div class="mb-3">
            <label for="title" class="form-label">Đặt tiêu đề cho công thức của bạn</label>
            <Field name="title" type = "text" class = "form-control" value = "">
            </Field>
            <ErrorMessage name = "name" class= "error-feedback" />

        </div>
        <div class = "mb-3">
            <label for="Description" class="form-label">Miêu tả công thức của bạn, bao gồm cả nguyên liệu</label>
            <Field name = "description" type = "text" class = "form-control" value = ""></Field>
            <ErrorMessage name = "description" class= "error-feedback" />
        </div>
         <div class = "mb-3">
            <label for="Tags" class="form-label">Các nhãn để người khác tìm thấy công thức của bạn (Bánh ngọt, món chay,...)</label>
            <field name = "tags" type = "text" class = "form-control" value = ""></field>
            <ErrorMessage name = "tags" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="Prep_time" class="form-label">Thời gian chuẩn bị nguyên liệu</label>
            <field name = "Prep_time" type = "text" class = "form-control" value = ""></field>
            <ErrorMessage name = "Prep_time" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="cook_time" class="form-label">Thời gian chế biến</label>
            <field name = "cook_time" type = "text" class = "form-control" value = ""></field>
            <ErrorMessage name = "cook_time" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="servings" class="form-label">Khẩu phần</label>
            <field name = "servings" type = "text" class = "form-control" value = ""></field>
            <ErrorMessage name = "servings" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="instruction" class="form-label">Hướng dẫn các bước thực hiện</label>
            <field name = "instruction" type = "text" class = "form-control" value = ""></field>
            <ErrorMessage name = "instruction" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="note" class="form-label">Những điểm cần lưu ý</label>
            <field name = "note" type = "text" class = "form-control" value = ""></field>
            <ErrorMessage name = "note" class= "error-feedback" />
        </div>
        <div class="mb-3 w-50 h-50">
            <label for="imgfile">Thêm một hình ảnh thành phẩm nấu ăn của bạn</label>
            <img
                class="img-fluid img-thumbnail"
                :src="imgFile"
                alt=""
                @click="imgFileInput.click()"
            />
            <Field name="img_file" v-slot="{ handleChange }">
            <input
                type="file"
                class="d-none"
                ref="img-file-input"
                @change="
                (event) => {
                handleChange(event);
                previewImgFile(event);
                }
            "
            />
            </Field>
        </div>
        <div class="mb-3">
            <button class="btn btn-primary"><i class="fas fa-save"></i>Lưu công thức</button>
            <button
                type="button"
                class="ms-2 btn btn-danger"
                @click="deleteRecipe">
                    <i class="fa fa-trash">Xóa công thức này</i>
            </button>
        </div>
    </form>
</template>

<style scoped>
@import '@/assets/form.css';
button .btn-primary {
    background-color: #6A9C89;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    text-decoration: none;
    color: #ffffff;
}

button:hover {
  background-color: #54796a;
  color: #ffffff;
}
</style>