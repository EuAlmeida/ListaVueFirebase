<template>
<v-container class="pa8" fluid>
    <h1 class="h1">Lista de tarefas</h1>
    <v-form>
        <v-text-field label="Nova Tarefa" v-model="novatarefa" @keydown.enter="adicionar">
            <v-icon slot="append" @click="adicionar">mdi-send</v-icon>
        </v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-list>
        <v-list-item-group>
            <v-list-item v-for="tarefa of tarefas" :key="tarefa.id">
                {{ tarefa.titulo }}
            </v-list-item>
    
        </v-list-item-group>
    </v-list>
</v-container>
  
</template>

<script>
import * as fb from "@/plugins/firebase"
export default {
    data() {
        return{
            uid: '',
            novatarefa:"",
            tarefas:[],
        };
    },
    mounted() {
        this.uid = fb.auth.currentUser.uid;
        this.lerTarefas()
    },

    methods: {
        async buscarTarefasDoServidor(){
            this.tarefas = []
            const logTasks = await fb.tasksCollection.where('owner', "==", this.uid).get();
            for( const doc of logTasks.docs){
                this.tarefas.push({
                    id: doc.id,
                    titulo: doc.data().titulo,
                })
            }
            
        },
        async adicionar(){
            await fb.tasksCollection.add({
                titulo: this.novatarefa,
                dataGravacao: new Date().toISOString().slice(0, 10),
                owner: this.uid,
            });
            this.novaTarefa= ''
            this.buscarTarefasDoServidor();
            
        },
    },

};
</script>

<style>

</style>