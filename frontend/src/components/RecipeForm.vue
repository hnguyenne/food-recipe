<script setup>
import { ref, useTemplateRef, computed } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const props = defineProps({
    recipe: { type: Object, required: true },
});

let imgFileInput = useTemplateRef('img-file-input');
let imgFile = ref(props.recipe.img_url);
const $emit = defineEmits(['submit:recipe', 'delete:recipe']);

let validationSchema = toTypedSchema(
    z.object({
        title: z.string().min(1, {message: "Tên công thức không được để trống"}),
        description: z.string().min(1, {message: "Hãy thêm mô tả cho công thức của bạn"}),
        tags: z.string(),
        prep_time: z.number(),
        cook_time: z.number(),
        servings: z.number(),
        instruction: z.string().min(1, { message: "Hãy thêm hướng dẫn thực hiện"}),
        note: z.string().optional(),
        img_url: z.instanceof(File).optional(),
    })
);

function previewImgFile(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
        imgFile.value = evt.target.result;
    }
    reader.readAsDataURL(file);
}

function submitRecipe(values) {
    let formData = new FormData();
    for (let key in values){
        if (values[key] !== undefined){
            formData.append(key, values[key]);
        }
    }
    $emit('submit:recipe', formData);
}

function deleteRecipe(){
    $emit('delete:recipe', props.recipe.recipe_id)
}
</script>
<template>
    <Form @submit = "submitRecipe">
        <div class="mb-3">
            <label for="title" class="form-label">Đặt tiêu đề cho công thức của bạn</label>
            <Field name="title" type = "text" class = "form-control" :value = "props.recipe.title">
            </Field>
            <ErrorMessage name = "name" class= "error-feedback" />

        </div>
        <div class = "mb-3">
            <label for="Description" class="form-label">Miêu tả công thức của bạn, bao gồm cả nguyên liệu</label>
            <Field name = "description" type = "text" class = "form-control" :value = "recipe.description"></Field>
            <ErrorMessage name = "description" class= "error-feedback" />
        </div>
         <div class = "mb-3">
            <label for="Tags" class="form-label">Các nhãn để người khác tìm thấy công thức của bạn (Bánh ngọt, món chay,...)</label>
            <field name = "tags" type = "text" class = "form-control" :value = "recipe.tags"></field>
            <ErrorMessage name = "tags" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="Prep_time" class="form-label">Thời gian chuẩn bị nguyên liệu</label>
            <field name = "Prep_time" type = "text" class = "form-control" :value = "recipe.prep_time"></field>
            <ErrorMessage name = "Prep_time" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="cook_time" class="form-label">Thời gian chế biến</label>
            <field name = "cook_time" type = "text" class = "form-control" :value = "recipe.cook_time"></field>
            <ErrorMessage name = "cook_time" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="servings" class="form-label">Khẩu phần</label>
            <field name = "servings" type = "text" class = "form-control" :value = "recipe.servings"></field>
            <ErrorMessage name = "servings" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="instruction" class="form-label">Hướng dẫn các bước thực hiện</label>
            <field name = "instruction" type = "text" class = "form-control" :value = "recipe.instruction"></field>
            <ErrorMessage name = "instruction" class= "error-feedback" />
        </div>
        <div class = "mb-3">
            <label for="note" class="form-label">Những điểm cần lưu ý</label>
            <field name = "note" type = "text" class = "form-control" :value = "recipe.note"></field>
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
                v-if="recipe.recipe_id"
                type="button"
                class="ms-2 btn btn-danger"
                @click="deleteRecipe">
                    <i class="fa fa-trash">Xóa công thức này</i>
            </button>
        </div>
    </Form>
</template>

<style scoped>
@import '../assets/form.css';
</style>